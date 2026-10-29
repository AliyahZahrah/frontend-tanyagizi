const API_URL = '/api';

const POLL_INTERVAL_MS = 2000;          // cek hasil tiap 2 detik
const MAX_WAIT_MS = 5 * 60 * 1000;      // menyerah setelah 5 menit
const MAX_CONSECUTIVE_FAILS = 5;        // toleransi gangguan jaringan sesaat

const NGROK_HEADERS = { 'ngrok-skip-browser-warning': 'true' };

export interface RAGSource {
  source: string;
  chunk_id: number;
  similarity_score: number;
}

export interface RAGResponse {
  status?: 'success' | 'not_found' | 'error';
  answer: string;
  sources?: RAGSource[];
  latency?: {
    retrieve_s: number;
    generate_s: number;
    total_s: number;
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchRAG(
  query: string,
  top_k: number = 5,
  threshold: number = 0.5
): Promise<RAGResponse> {
  // 1) Buat job: backend langsung membalas job_id (tidak menunggu jawaban jadi)
  const startRes = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { ...NGROK_HEADERS, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, top_k, threshold }),
  });

  if (!startRes.ok) {
    throw new Error(`HTTP error: ${startRes.status}`);
  }

  let job_id: string;
  try {
    ({ job_id } = await startRes.json());
  } catch {
    throw new Error('Respons server bukan JSON (cek apakah tunnel ngrok aktif).');
  }

  // 2) Polling sampai job selesai
  const startedAt = Date.now();
  let fails = 0;

  while (Date.now() - startedAt < MAX_WAIT_MS) {
    await sleep(POLL_INTERVAL_MS);

    let res: Response;
    try {
      res = await fetch(`${API_URL}/jobs/${job_id}`, {
        headers: NGROK_HEADERS,
      });
    } catch {
      if (++fails >= MAX_CONSECUTIVE_FAILS) throw new Error('Koneksi ke server terputus.');
      continue;
    }

    if (res.status === 404) {
      throw new Error('Job tidak ditemukan (server mungkin dijalankan ulang).');
    }
    if (!res.ok) {
      if (++fails >= MAX_CONSECUTIVE_FAILS) throw new Error(`HTTP error: ${res.status}`);
      continue;
    }

    let data: any;
    try {
      data = await res.json();
    } catch {
      // Biasanya HTML dari ngrok / tunnel, bukan JSON: hitung sebagai gagal sesaat
      if (++fails >= MAX_CONSECUTIVE_FAILS) {
        throw new Error('Respons server bukan JSON (cek apakah tunnel ngrok aktif).');
      }
      continue;
    }

    fails = 0;

    if (data.status === 'done') {
      return data.result as RAGResponse;
    }
    if (data.status === 'error') {
      throw new Error(data.error || 'Gagal memproses pertanyaan.');
    }
    // status 'queued' atau 'running' → lanjut menunggu
  }

  throw new Error('Waktu tunggu habis.');
}
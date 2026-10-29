<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# TanyaGizi

Frontend React + Vite untuk TanyaGizi. Semua permintaan chat (`/api/query`) diteruskan (proxy) langsung ke backend RAG (FastAPI) melalui konfigurasi `server.proxy` di `vite.config.ts` — tidak ada lagi server perantara (Express) maupun pemanggilan Gemini API.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Pastikan `target` pada `server.proxy['/api']` di [vite.config.ts](vite.config.ts) menunjuk ke URL backend RAG (FastAPI) yang sedang aktif (URL Cloudflare Tunnel bersifat sementara, cek dan sesuaikan bila berubah)
3. Run the app:
   `npm run dev`

## Build

`npm run build` lalu `npm run preview` untuk mencoba hasil build secara lokal.

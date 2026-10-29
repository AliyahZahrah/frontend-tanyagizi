import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, BookOpen, ChevronDown, ChevronUp, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: 'Informasi apa saja yang dapat ditanyakan?',
    answer: 'Pengguna dapat mengajukan pertanyaan seputar gizi kesehatan masyarakat, seperti stunting, gizi seimbang, kebutuhan zat gizi, pola makan sehat, anemia, obesitas, gizi ibu hamil, gizi balita, dan topik terkait lainnya.',
  },
  {
    question: 'Dari mana sumber jawaban diperoleh?',
    answer: 'Jawaban dihasilkan oleh model Qwen3-8B berdasarkan informasi yang diambil dari knowledge base yang berisi dokumen referensi terpercaya.',
  },
  {
    question: 'Mengapa jawaban menampilkan sumber referensi?',
    answer: 'Untuk meningkatkan transparansi sistem serta menunjukkan dokumen yang menjadi dasar dalam penyusunan jawaban.',
  },
  {
    question: 'Mengapa jawaban terkadang tidak sesuai dengan yang diharapkan?',
    answer: 'Hal ini dapat terjadi apabila pertanyaan kurang spesifik atau informasi yang tersedia pada knowledge base belum mencakup topik yang ditanyakan.',
  },
  {
    question: 'Apakah sistem dapat digunakan sebagai pengganti konsultasi dengan dokter atau ahli gizi?',
    answer: 'Tidak. Sistem ini hanya memberikan informasi berdasarkan dokumen referensi dan tidak menggantikan diagnosis maupun konsultasi dengan tenaga kesehatan profesional.',
  },
];

const GUIDELINES = [
  'Masukkan pertanyaan yang berkaitan dengan gizi kesehatan masyarakat menggunakan bahasa Indonesia.',
  'Gunakan kalimat yang jelas, singkat, dan spesifik agar sistem dapat memberikan jawaban yang lebih akurat.',
  'Tekan tombol Kirim untuk mengirim pertanyaan.',
  'Sistem akan mencari informasi yang relevan dari knowledge base menggunakan metode Retrieval-Augmented Generation (RAG).',
  'Jawaban akan ditampilkan beserta sumber referensi yang digunakan.',
  'Riwayat pertanyaan akan tersimpan secara otomatis pada akun pengguna yang telah login.',
  'Jawaban yang diberikan bersifat informatif dan tidak menggantikan konsultasi dengan tenaga kesehatan profesional.',
];

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const [activeTab, setActiveTab] = useState<'guide' | 'faq'>('guide');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setExpandedFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden z-10 flex flex-col max-h-[88vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Panduan & FAQ</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Petunjuk penggunaan & tanya jawab sistem TanyaGizi</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Tutup modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-3 gap-2 bg-slate-50/30 dark:bg-slate-900/30">
              <button
                onClick={() => setActiveTab('guide')}
                className={`pb-3 px-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === 'guide'
                    ? 'border-primary text-primary dark:text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Sparkles className="h-4 w-4" />
                Panduan Penggunaan
              </button>
              <button
                onClick={() => setActiveTab('faq')}
                className={`pb-3 px-4 text-sm font-bold transition-all border-b-2 flex items-center gap-2 ${
                  activeTab === 'faq'
                    ? 'border-primary text-primary dark:text-primary'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <HelpCircle className="h-4 w-4" />
                Frequently Asked Questions (FAQ)
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-700 dark:text-slate-200">
              {activeTab === 'guide' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex items-start gap-3">
                    <ShieldAlert className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      Sistem ini memanfaatkan teknologi <strong>Retrieval-Augmented Generation (RAG)</strong> berbasis literatur gizi kesehatan masyarakat terpercaya di Indonesia.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Langkah-langkah Penggunaan:
                    </h3>
                    <ul className="space-y-2.5">
                      {GUIDELINES.map((guide, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-sm leading-relaxed"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs mt-0.5">
                            {idx + 1}
                          </div>
                          <span>{guide}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-3">
                  {FAQ_DATA.map((faq, idx) => {
                    const isExpanded = expandedFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => toggleFaq(idx)}
                          className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800/70 transition-colors gap-3"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-0.5 rounded-md">
                              Q{idx + 1}
                            </span>
                            {faq.question}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/60 dark:border-slate-800/60 leading-relaxed">
                                <p className="pt-2">{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mengerti
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

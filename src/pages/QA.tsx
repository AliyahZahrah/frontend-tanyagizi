import { useState, useRef, useEffect, type MouseEvent } from 'react';
import { Send, Bot, User, BookOpen, Loader2, Clock, Copy, Check, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { fetchRAG, RAGSource } from '../lib/api';
import ReactMarkdown from 'react-markdown';
import GuideModal from '../components/GuideModal';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: RAGSource[];
  timestamp: Date;
  latency?: {
    retrieve_s: number;
    generate_s: number;
    total_s: number;
  };
}

const SUGGESTED_PROMPTS = [
  'Apa itu stunting?',
  'Berapa kebutuhan kalori remaja?',
  'Apa perbedaan gizi makro dan mikro?',
  'Apa penyebab dan gejala anemia gizi besi?',
  'Berapa kebutuhan kalori harian ibu hamil?',
];

export default function QA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Halo! Saya asisten gizi Anda. Ada yang bisa saya bantu terkait pola makan, kebutuhan nutrisi, atau analisis menu sehat hari ini? Saya siap memberikan saran profesional yang sesuai dengan kebutuhan Anda.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // ===== Geser (drag) & roda mouse untuk daftar contoh pertanyaan =====
  const promptsRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = promptsRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = promptsRef.current;
    const d = dragState.current;
    if (!el || !d.isDown) return;
    const dx = e.pageX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true; // dianggap drag, bukan klik
    el.scrollLeft = d.scrollLeft - dx;
  };

  const stopDrag = () => {
    dragState.current.isDown = false;
  };

  // Cegah tombol prompt ikut terklik setelah selesai drag
  const handleClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (dragState.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      dragState.current.moved = false;
    }
  };

  // Roda mouse (vertikal) diubah menjadi geser horizontal
  useEffect(() => {
    const el = promptsRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return; // tidak ada yang perlu digeser
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);
  // =====================================================================

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP smooth entrance for suggested prompts
      gsap.fromTo(
        '.gsap-prompt-btn',
        { opacity: 0, scale: 0.9, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );

      // GSAP continuous gentle sparkle spin
      gsap.to('.gsap-sparkle', {
        rotation: 360,
        duration: 10,
        repeat: -1,
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const executeSend = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: queryText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await fetchRAG(queryText.trim());

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.status === 'not_found'
          ? 'Maaf, saya tidak menemukan informasi yang relevan dalam sumber yang tersedia.'
          : result.answer,
        sources: result.sources,
        latency: result.latency,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('fetchRAG error:', error); // bantu debugging di DevTools Console
      const errMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Maaf, sistem sedang mengalami kendala sementara atau antrean permintaan yang padat. Silakan coba kirim ulang pertanyaan Anda dalam beberapa saat.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMessage]);
    }

    setIsLoading(false);
  };

  const handleSend = () => {
    executeSend(input);
  };

  const handleCopy = (id: string, text: string) => {
    if (!navigator.clipboard) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    } else {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId((prev) => (prev === id ? null : prev));
    }, 2000);
  };

  return (
    <div ref={containerRef} className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      {/* Decorative ambient glow (aesthetic only, non-interactive) */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 blur-3xl pointer-events-none animate-float-slower" />
      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full custom-scrollbar"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 sm:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full ${
                msg.role === 'model' 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {msg.role === 'model' ? <Bot className="h-5 w-5 sm:h-6 sm:w-6" /> : <User className="h-5 w-5 sm:h-6 sm:w-6" />}
              </div>

              <div className={`flex flex-col gap-1.5 max-w-[85%] sm:max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  {msg.role === 'model' ? 'TanyaGizi AI' : 'Anda'}
                </span>

                <div className={`rounded-2xl px-5 py-4 shadow-sm border transition-all duration-300 relative group ${
                  msg.role === 'model'
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-tl-none text-slate-800 dark:text-slate-100'
                    : 'bg-primary border-primary rounded-tr-none text-white'
                }`}>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {msg.role === 'model' ? (
                      <ReactMarkdown
                        components={{
                          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1.5 my-2">{children}</ol>,
                          ul: ({ children }) => <ul className="list-disc pl-5 space-y-1.5 my-2">{children}</ul>,
                          li: ({ children }) => <li className="pl-1">{children}</li>,
                          p:  ({ children }) => <p className="my-2 first:mt-0 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-white font-medium text-sm">{msg.text}</p>
                    )}
                  </div>

                  {/* Sumber referensi (hanya tampil jika ada sumber; kosong saat jawaban tidak ada di dataset) */}
                  {msg.role === 'model' && msg.id !== '1' && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 p-3 rounded-xl bg-primary/10 dark:bg-primary/15 border border-primary/25 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[10px] text-primary dark:text-primary font-semibold uppercase tracking-wider">
                        <BookOpen className="h-3 w-3" />
                        <span>Sumber: Literasi Gizi Kesehatan Masyarakat Indonesia</span>
                      </div>
                      <ul className="space-y-1">
                        {msg.sources.map((s, i) => (
                          <li key={i} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                            <span className="text-primary font-bold shrink-0">{i + 1}.</span>
                            <span>
                              {s.source.replace('.md', '')}
                              <span className="ml-1.5 text-[10px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-full">
                                {Math.round(s.similarity_score * 100)}% relevan
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer Aksi & Info (Hanya pada jawaban AI hasil pencarian/pertanyaan pengguna) */}
                  {msg.role === 'model' && msg.id !== '1' && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 transition-all active:scale-95 cursor-pointer font-medium"
                        title="Salin isi jawaban ini"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                            <span>Salin Jawaban</span>
                          </>
                        )}
                      </button>

                      {msg.latency && (
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                          <Clock className="h-3 w-3" />
                          {msg.latency.total_s}s
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-start gap-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="h-6 w-6" />
            </div>
            <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-800 flex items-center gap-2 shadow-sm">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm text-slate-500 dark:text-slate-400">TanyaGizi sedang mencari referensi & menyusun jawaban...</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Area + Suggested Prompts */}
      <div className="relative z-10 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80 p-3 sm:p-4 md:p-5 transition-colors duration-300">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Suggested Prompts (bisa digeser: sentuh, drag mouse, atau roda mouse) */}
          <div
            ref={promptsRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrag}
            onMouseLeave={stopDrag}
            onClickCapture={handleClickCapture}
            className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar cursor-grab active:cursor-grabbing select-none"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary dark:text-primary-300 shrink-0 mr-1">
              <Sparkles className="gsap-sparkle h-3.5 w-3.5" />
              <span className="hidden sm:inline">Contoh pertanyaan:</span>
            </div>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => executeSend(prompt)}
                disabled={isLoading}
                className="gsap-prompt-btn shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-primary/15 hover:text-primary dark:bg-slate-800 dark:hover:bg-primary/20 text-slate-700 dark:text-slate-300 dark:hover:text-primary-300 border border-slate-200/70 dark:border-slate-700 transition-all active:scale-95 disabled:opacity-50 cursor-pointer text-left"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Text Input */}
          <div className="flex items-end gap-2 sm:gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-2 shadow-lg focus-within:border-primary/50 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 resize-none border-none bg-transparent py-2.5 px-3 sm:px-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-0 min-h-[46px] max-h-[140px] focus:outline-none"
              placeholder="Tanyakan topik gizi kesehatan masyarakat di sini..."
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer"
              title="Kirim Pertanyaan"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 px-1">
            <p className="hidden sm:block uppercase tracking-wider">
              Jawaban bersifat informatif • Tidak menggantikan konsultasi medis
            </p>
            <button
              onClick={() => setIsGuideOpen(true)}
              className="ml-auto inline-flex items-center gap-1 hover:text-primary dark:hover:text-primary-300 font-semibold cursor-pointer underline underline-offset-2"
            >
              <HelpCircle className="h-3 w-3" />
              Buka Panduan & FAQ
            </button>
          </div>
        </div>
      </div>

      {/* Guide & FAQ Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
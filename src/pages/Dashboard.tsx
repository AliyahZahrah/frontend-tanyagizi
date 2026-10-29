import { useEffect, useRef } from 'react';
import { motion, Variants } from 'motion/react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import display1 from '../assets/display1.png';
import ikonibuhamil from '../assets/ikonibuhamil.png';
import ikonibumenyusui from '../assets/ikonibumenyusui.png';
import ikonbayi from '../assets/ikonbayi.png';
import ikonbalita from '../assets/ikonbalita.png';
import ikonanaksekolah from '../assets/ikonanaksekolah.png';
import ikonremaja from '../assets/ikonremaja.png';
import ikondewasa from '../assets/ikondewasa.png';
import ikonlansia from '../assets/ikonlansia.png';
import ikonchatbot from '../assets/ikonchatbot.png';
import ikonAI from '../assets/ikonAI.png';

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaOrb1Ref = useRef<HTMLDivElement>(null);
  const ctaOrb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. GSAP Floating CTA Bot Icon
      gsap.to('.gsap-bot-icon', {
        y: -5,
        rotation: 4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. GSAP CTA ambient glowing orbs
      if (ctaOrb1Ref.current) {
        gsap.to(ctaOrb1Ref.current, {
          x: 30,
          y: -20,
          scale: 1.2,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
      if (ctaOrb2Ref.current) {
        gsap.to(ctaOrb2Ref.current, {
          x: -30,
          y: 20,
          scale: 1.15,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Palet aksen bergilir per kategori agar tampilan lebih variatif,
  // tanpa mengubah konten — hanya warna ikon & efek hover yang berbeda-beda.
  const accentPalette = [
    { iconWrap: 'bg-primary/10 dark:bg-primary/15 text-primary', ring: 'hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-primary/10', title: 'group-hover:text-primary' },
    { iconWrap: 'bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400', ring: 'hover:border-emerald-400/40 dark:hover:border-emerald-500/40 hover:shadow-emerald-500/10', title: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400' },
    { iconWrap: 'bg-sky-500/10 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400', ring: 'hover:border-sky-400/40 dark:hover:border-sky-500/40 hover:shadow-sky-500/10', title: 'group-hover:text-sky-600 dark:group-hover:text-sky-400' },
    { iconWrap: 'bg-teal-500/10 dark:bg-teal-500/15 text-teal-600 dark:text-teal-400', ring: 'hover:border-teal-400/40 dark:hover:border-teal-500/40 hover:shadow-teal-500/10', title: 'group-hover:text-teal-600 dark:group-hover:text-teal-400' },
  ];

  const categories = [
    { icon: <img src={ikonibuhamil} alt="Ibu Hamil" className="h-10 w-10 object-contain" />, title: 'Ibu Hamil', desc: 'Panduan nutrisi lengkap untuk mendukung kesehatan ibu dan perkembangan janin.', accent: accentPalette[0] },
    { icon: <img src={ikonibumenyusui} alt="Ibu Menyusui" className="h-10 w-10 object-contain" />, title: 'Ibu Menyusui', desc: 'Nutrisi esensial untuk menjaga kualitas ASI dan memulihkan energi ibu pasca persalinan.', accent: accentPalette[1] },
    { icon: <img src={ikonbayi} alt="Bayi" className="h-10 w-10 object-contain" />, title: 'Bayi', desc: 'Panduan ASI eksklusif dan transisi menuju MPASI yang bergizi dan aman.', accent: accentPalette[2] },
    { icon: <img src={ikonbalita} alt="Balita" className="h-10 w-10 object-contain" />, title: 'Balita', desc: 'Strategi gizi untuk masa pertumbuhan emas dan pencegahan stunting.', accent: accentPalette[3] },
    { icon: <img src={ikonanaksekolah} alt="Anak Sekolah" className="h-10 w-10 object-contain" />, title: 'Anak Sekolah', desc: 'Penyediaan bekal sehat dan nutrisi pendukung konsentrasi belajar.', accent: accentPalette[1] },
    { icon: <img src={ikonremaja} alt="Remaja" className="h-10 w-10 object-contain" />, title: 'Remaja', desc: 'Manajemen gizi masa pubertas dan edukasi pola makan sehat bagi remaja aktif.', accent: accentPalette[2] },
    { icon: <img src={ikondewasa} alt="Dewasa" className="h-16 w-16 object-contain" />, title: 'Dewasa', desc: 'Pola hidup sehat dan gizi seimbang untuk menjaga produktivitas.', accent: accentPalette[3] },
    { icon: <img src={ikonlansia} alt="Lansia" className="h-10 w-10 object-contain" />, title: 'Lansia', desc: 'Pemenuhan nutrisi spesifik untuk menjaga kepadatan tulang di usia senja.', accent: accentPalette[0] },
  ];

  // Hero section entrance animation variants (instant, no delay, non-looping)
  const heroContainerVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Spring animations aligned with Information page
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      } 
    },
  };

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-slate-50 to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">
        {/* Ambient color blobs behind everything — decorative only */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary/10 dark:bg-primary/15 blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-emerald-400/15 dark:bg-emerald-500/10 blur-3xl pointer-events-none animate-float-slower" />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text content — no overlay, sits directly on the soft gradient background */}
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 order-2 lg:order-1"
          >
            <motion.div 
              variants={heroItemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary-700 dark:text-primary-300 dark:bg-primary/20 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20 cursor-default"
            >
              <img src={ikonAI} alt="AI" className="h-4 w-4 object-contain" />
              AI-Powered Nutrition Assistant
            </motion.div>

            <motion.h1 
              variants={heroItemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-slate-900 dark:text-white tracking-tight"
            >
              <span>Sistem Tanya Jawab Gizi</span>{" "}
              <span className="gradient-text-primary block">Kesehatan Masyarakat</span>
            </motion.h1>

            <motion.p 
              variants={heroItemVariants}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed max-w-xl"
            >
              Solusi cerdas berbasis <span className="font-bold text-primary">RAG (Retrieval-Augmented Generation)</span> untuk mendapatkan informasi gizi yang akurat, cepat, dan terpercaya berdasarkan literatur gizi kesehatan masyarakat di Indonesia.
            </motion.p>

            <motion.div 
              variants={heroItemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <motion.a 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="#materi" 
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('materi');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-2xl font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                Pelajari Materi Gizi
                <ArrowDown className="h-5 w-5 animate-bounce" />
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link to="/qa" className="bg-white dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 px-7 py-3.5 rounded-2xl font-bold hover:bg-white dark:hover:bg-slate-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all flex items-center gap-2 justify-center shadow-md text-sm sm:text-base">
                  Coba Tanya AI <ArrowRight className="h-5 w-5 animate-bounce" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Illustration in a rounded frame card, static — only reacts on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative order-1 lg:order-2 w-full flex items-center justify-center"
          >
            <div className="absolute inset-6 rounded-[2.5rem] bg-gradient-to-tr from-primary/15 via-emerald-300/15 to-transparent blur-2xl pointer-events-none" />
            <div className="group relative w-full max-w-md lg:max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] p-5 sm:p-7 border border-white dark:border-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <img
                src={display1}
                alt="Ilustrasi gaya hidup sehat dan gizi seimbang"
                className="relative w-full h-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Materi Gizi Section */}
      <section className="py-24 bg-white dark:bg-slate-900 px-4 md:px-10 lg:px-20 transition-colors duration-300" id="materi">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white transition-colors duration-300">Materi Gizi Berdasarkan Tahapan Usia</h2>
              <p className="text-slate-600 dark:text-slate-350 max-w-xl transition-colors duration-300">
                Edukasi gizi yang dirancang khusus untuk memenuhi kebutuhan nutrisi di setiap fase kehidupan manusia.
              </p>
            </div>
            <Link to="/information" className="flex items-center gap-2 text-primary dark:text-primary-foreground font-bold hover:gap-3 transition-all group px-4 py-2 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10">
              <span>Informasi Lebih Lanjut</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className={`group p-6 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-transparent dark:border-slate-800/40 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between ${cat.accent.ring}`}
              >
                <div>
                  <div className={`size-14 rounded-xl shadow-sm dark:shadow-md flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 ${cat.accent.iconWrap}`}>
                    {cat.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 transition-colors duration-300 ${cat.accent.title}`}>{cat.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                    {cat.desc}
                  </p>
                </div>
                <div className={`mt-4 flex items-center gap-1.5 text-xs font-bold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ${cat.accent.title}`}>
                  <span>Lihat Panduan</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Full width section divider with ambient glow */}
      <section 
        className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white transition-colors duration-300 relative overflow-hidden"
      >
        {/* Ambient floating glow circles */}
        <div ref={ctaOrb1Ref} className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div ref={ctaOrb2Ref} className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-teal-300/15 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/15 text-white text-xs md:text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm shadow-sm"
          >
            Solusi Cerdas & Cepat
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight"
          >
            Ingin tahu lebih lanjut mengenai Gizi Kesehatan Masyarakat?
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Jangan biarkan pertanyaan Anda tidak terjawab. Tanyakan langsung pada asisten AI kami yang terlatih khusus dengan data gizi medis terpercaya.
          </motion.p>

          <div className="pt-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link 
                to="/qa" 
                className="bg-white text-primary hover:bg-slate-50 px-8 py-4 rounded-2xl text-base sm:text-lg font-extrabold shadow-xl transition-all inline-flex items-center gap-3"
              >
                <img src={ikonchatbot} alt="Chatbot" className="gsap-bot-icon h-7 w-7 object-contain" />
                <span>Tanya AI Sekarang</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}


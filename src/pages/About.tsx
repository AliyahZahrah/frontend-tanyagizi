import { useEffect, useRef } from 'react';
import { motion, Variants } from 'motion/react';
import gsap from 'gsap';
import {
  Mail,
  GraduationCap,
  Network,
  Layers,
  Bot,
  Github,
  Linkedin,
  SearchCheck,
  MessageSquare,
  HeartPulse,
  ShieldCheck,
  FileText,
  Languages,
  Cpu,
  AlertCircle,
  User,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import aliyah1 from '../assets/aliyah1.jpg';

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. GSAP Floating Ambient Orbs animation loop
      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: 24,
          y: -20,
          scale: 1.12,
          rotation: 8,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -20,
          y: 25,
          scale: 1.15,
          rotation: -10,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }

      if (orb3Ref.current) {
        gsap.to(orb3Ref.current, {
          scale: 1.25,
          opacity: 0.8,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1,
        });
      }

      // 2. GSAP Gentle levitation for profile image
      if (photoRef.current) {
        gsap.to(photoRef.current, {
          y: -10,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }

      // 3. GSAP Smooth entrance stagger for interactive cards and section badges
      gsap.fromTo(
        '.gsap-card',
        {
          opacity: 0,
          y: 28,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.15,
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15 
      },
    },
  };

  const objectives = [
    {
      number: '01',
      title: 'Kemudahan Akses Informasi',
      description:
        'Pengguna dapat memperoleh jawaban atas pertanyaan gizi secara mudah tanpa perlu menelusuri banyak sumber secara manual.',
      icon: SearchCheck,
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80',
    },
    {
      number: '02',
      title: 'Penyajikan Jawaban Jelas',
      description:
        'Menyajikan jawaban yang mudah dipahami oleh pengguna.',
      icon: MessageSquare,
      badgeBg: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200 dark:border-sky-800/80',
    },
    {
      number: '03',
      title: 'Pemahaman Kebutuhan Gizi',
      description:
        'Informasi yang dihasilkan dapat membantu dalam memahami kebutuhan gizi.',
      icon: HeartPulse,
      badgeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800/80',
    },
  ];

  const technologies = [
    {
      icon: Network,
      title: 'RAG Architecture',
      subtitle: 'Retrieval-Augmented Generation',
      desc: 'Sistem pencarian informasi kontekstual yang mengintegrasikan basis pengetahuan terverifikasi dengan LLM.',
      tag: 'Core System',
      iconStyle: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    },
    {
      icon: Layers,
      title: 'BGE-M3 Embedding',
      subtitle: 'Multilingual Dense Vectorizer',
      desc: 'Pemproses representasi vektor teks untuk menangkap kemiripan makna pertanyaan dengan dokumen gizi.',
      tag: 'Vector Search',
      iconStyle: 'bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400',
    },
    {
      icon: Bot,
      title: 'Qwen3-8B',
      subtitle: 'Large Language Model',
      desc: 'Model kecerdasan buatan untuk merangkum dan mengonstruksi jawaban ramah pengguna berbasis konteks.',
      tag: 'Generative AI',
      iconStyle: 'bg-sky-500/10 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400',
    },
    {
      icon: ShieldCheck,
      title: 'Sumber Literasi Gizi',
      subtitle: 'Tervalidasi Dokter Gizi',
      desc: 'Sumber literasi terdiri dari 105 file yang berkaitan dengan gizi kesehatan masyarakat dan telah divalidasi oleh Dokter Gizi.',
      tag: '105 Files',
      iconStyle: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    },
  ];

  const limitations = [
    {
      icon: HeartPulse,
      title: 'Edukasi & Non-Medis',
      desc: 'Berfokus pada edukasi gizi dan pencegahan stunting, serta tidak digunakan sebagai alat diagnosis, konsultasi, maupun pengganti tenaga kesehatan profesional.',
      tag: 'Cakupan Layanan',
      badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
      iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      icon: FileText,
      title: 'Sumber Informasi Resmi',
      desc: 'Informasi yang disajikan bersumber dari pedoman resmi, buku ajar, modul pembelajaran, dan literatur edukasi yang berkaitan dengan gizi kesehatan masyarakat.',
      tag: 'Basis Data',
      badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Languages,
      title: 'Bahasa Indonesia',
      desc: 'Seluruh layanan dan respons chatbot menggunakan Bahasa Indonesia.',
      tag: 'Bahasa',
      badgeBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
      iconBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
    {
      icon: Cpu,
      title: 'Metode RAG & AI Model',
      desc: 'Sistem menggunakan metode Retrieval-Augmented Generation (RAG) dengan model BGE-M3 sebagai embedding model dan Qwen3-8B sebagai Large Language Model (LLM) untuk menghasilkan jawaban yang relevan berdasarkan sumber pengetahuan yang tersedia.',
      tag: 'Model AI',
      badgeBg: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800/60',
      iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
  ];

  return (
    <div ref={rootRef} className="min-h-screen transition-colors duration-300 text-slate-900 dark:text-slate-100 selection:bg-primary/20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {/* SECTION 1: Profile / Header (Warm, Aesthetic & Welcoming Ambient Mesh) */}
        <section className="relative overflow-hidden py-14 sm:py-18 lg:py-22 bg-gradient-to-br from-amber-50/75 via-[#EEEEEE]/80 to-emerald-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-amber-100/70 dark:border-slate-800/80">
          {/* GSAP-animated Ambient Glow Orbs */}
          <div ref={orb1Ref} className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-amber-300/25 via-orange-200/20 to-transparent rounded-full blur-3xl pointer-events-none animate-float-slow" />
          <div ref={orb2Ref} className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-teal-300/20 via-emerald-200/15 to-transparent rounded-full blur-3xl pointer-events-none animate-float-slower" />
          <div ref={orb3Ref} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-amber-200/10 via-primary/5 to-teal-200/10 rounded-full blur-3xl pointer-events-none" />

          {/* Delicate Pattern Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#3A9188_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.035] dark:opacity-[0.05] pointer-events-none" />

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left order-2 lg:order-1">
                {/* Badge Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-slate-800/90 text-primary dark:text-primary-300 border border-emerald-200/70 dark:border-slate-700 text-xs font-bold tracking-wide shadow-xs backdrop-blur-xs">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>Perancang &amp; Pengembang Sistem</span>
                </div>

                {/* Title & University */}
                <div className="space-y-2.5">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    Aliyah Zahrah
                  </h1>
                  <p className="text-base sm:text-lg font-semibold text-slate-600 dark:text-slate-300 flex items-center justify-center lg:justify-start gap-2.5">
                    <span className="p-1.5 rounded-xl bg-white/90 dark:bg-slate-800/90 text-primary border border-slate-200/80 dark:border-slate-700 shadow-xs">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <span>Universitas Tarumanagara</span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="mailto:aliyah2208@gmail.com"
                    className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all cursor-pointer group"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    <span>Hubungi via Email</span>
                    <ArrowUpRight className="h-3.5 w-3.5 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://github.com/AliyahZahrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-white/95 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-xs transition-all cursor-pointer gap-2 border border-slate-200/90 dark:border-slate-700 backdrop-blur-xs"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </motion.a>

                  <motion.a
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://www.linkedin.com/in/aliyah-zahrah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-full bg-white/95 hover:bg-white dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-xs transition-all cursor-pointer gap-2 border border-slate-200/90 dark:border-slate-700 backdrop-blur-xs"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </motion.a>
                </div>
              </div>

              {/* Right Photo Column with GSAP Levitation */}
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <div ref={photoRef} className="relative">
                  {/* Glowing organic backdrop halo with warm amber and soft mint accents */}
                  <div className="absolute -inset-4 rounded-[2.75rem] bg-gradient-to-tr from-amber-400/25 via-primary/25 to-teal-300/20 dark:from-amber-500/20 dark:to-primary/20 blur-xl" />
                  
                  {/* Photo container */}
                  <div className="relative h-60 w-60 sm:h-72 sm:w-72 rounded-[2.25rem] overflow-hidden bg-white/60 dark:bg-slate-800 shadow-2xl border-4 border-white/95 dark:border-slate-800 ring-1 ring-amber-200/60 dark:ring-slate-700 group backdrop-blur-xs">
                    <img
                      src={aliyah1}
                      alt="Aliyah Zahrah"
                      className="h-full w-full object-cover dark:brightness-95 transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: Deskripsi Perancangan (Clean White / Dark Canvas) */}
        <section className="bg-white dark:bg-slate-950 py-14 sm:py-18">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Tentang Sistem
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Deskripsi Perancangan
                </h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
                  Sistem Tanya Jawab Gizi Berbasis RAG
                </p>
              </div>

              <div className="gsap-card bg-slate-50/90 dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                <p>
                  Website Sistem Tanya Jawab Berbahasa Indonesia berbasis Retrieval-Augmented Generation (RAG) dikembangkan sebagai media edukasi digital yang menyediakan informasi gizi kesehatan masyarakat secara akurat, kontekstual, dan berbasis sumber tepercaya. Sistem ini dirancang untuk membantu masyarakat memperoleh informasi mengenai kebutuhan gizi, pola makan sehat, serta pencegahan stunting melalui interaksi tanya jawab yang mudah digunakan.
                </p>
                <p>
                  Dengan memanfaatkan teknologi Retrieval-Augmented Generation (RAG), sistem mampu menghasilkan jawaban yang relevan berdasarkan basis pengetahuan yang telah disiapkan. Pengembangan website ini bertujuan untuk meningkatkan literasi gizi masyarakat serta mendukung penyebaran informasi kesehatan yang lebih luas, mudah diakses, dan terpercaya.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: Tujuan Perancangan (Soft Emerald Tinted Background) */}
        <section className="bg-emerald-50/40 dark:bg-slate-900/60 py-14 sm:py-20 border-y border-emerald-100/70 dark:border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <motion.div
              variants={itemVariants}
              className="text-center max-w-2xl mx-auto space-y-1.5"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Objektif &amp; Dampak
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Tujuan Perancangan
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
                Target dan manfaat utama yang ingin dicapai melalui perancangan sistem ini
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {objectives.map((obj, idx) => {
                const Icon = obj.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="gsap-card bg-white dark:bg-slate-900/90 rounded-2xl p-6 sm:p-7 border border-emerald-100 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 flex flex-col justify-between space-y-4 transition-all duration-300 group cursor-default"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${obj.badgeBg} shadow-xs group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-black text-slate-200 dark:text-slate-800 group-hover:text-primary/30 transition-colors">
                          {obj.number}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                          {obj.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {obj.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: Teknologi & Arsitektur Utama (Soft Slate Tinted Background) */}
        <section className="bg-slate-50/80 dark:bg-slate-900/70 py-14 sm:py-20 border-y border-slate-200/70 dark:border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <motion.div
              variants={itemVariants}
              className="space-y-1.5 border-b border-slate-200/80 dark:border-slate-800/80 pb-5"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Fondasi Sistem
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Teknologi &amp; Arsitektur Utama
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
                Infrastruktur kecerdasan buatan dan basis pengetahuan sistem
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {technologies.map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ duration: 0.25 }}
                    className="gsap-card bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 flex flex-col sm:flex-row items-start gap-4 transition-all duration-300 group cursor-default"
                  >
                    <div className={`h-12 w-12 rounded-2xl ${tech.iconStyle} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5 flex-1 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                          {tech.title}
                        </h3>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700 shrink-0">
                          {tech.tag}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-primary">
                        {tech.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed pt-0.5">
                        {tech.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: Batasan Rancangan & Disclaimer (Matching Soft Emerald Green Background) */}
        <section className="bg-emerald-50/40 dark:bg-slate-900/60 py-14 sm:py-20 border-t border-emerald-100/70 dark:border-slate-800/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <motion.div
              variants={itemVariants}
              className="text-center max-w-2xl mx-auto space-y-1.5"
            >
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Ruang Lingkup
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Batasan Rancangan
              </h2>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
                Ketentuan dan batas operasional sistem sebagai media edukasi gizi
              </p>
            </motion.div>

            {/* Limitations Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {limitations.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ duration: 0.25 }}
                    className="gsap-card bg-white dark:bg-slate-900/90 rounded-2xl p-6 border border-emerald-100 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-primary/5 hover:border-primary/40 flex flex-col justify-start gap-3.5 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-xs`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border shrink-0 ${item.badgeBg}`}>
                        {item.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Disclaimer Box (Harmonious Floating Callout Card) */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.01, y: -2 }}
              transition={{ duration: 0.2 }}
              className="gsap-card bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
                <AlertCircle className="h-6 w-6 text-amber-600 dark:text-amber-400 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-3xl">
                <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Disclaimer
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/90 dark:text-amber-200/90 font-medium leading-relaxed">
                  Informasi yang diberikan bertujuan sebagai edukasi dan tidak dapat menggantikan pemeriksaan, diagnosis, atau penanganan oleh dokter maupun tenaga kesehatan profesional.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

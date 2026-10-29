import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ShieldCheck, BicepsFlexed, Target, Utensils, Droplets, Dumbbell, AlertCircle, Sparkles, Brain, CheckCircle2, HelpCircle, X, ArrowRight } from 'lucide-react';
import display2 from '../assets/display2.jpg';
import ibuhamil from '../assets/ibuhamil.jpg';
import ibumenyusui from '../assets/ibumenyusui.png';
import bayi from '../assets/bayi.png';
import balita from '../assets/balita.png';
import anaksekolah from '../assets/anaksekolah.jpg';
import remaja from '../assets/remaja.jpg';
import dewasa from '../assets/dewasa.png';
import lansia from '../assets/lansia.jpg';
import ikonchatbot from '../assets/ikonchatbot.png';
import ikonibuhamil from '../assets/ikonibuhamil.png';
import ikonibumenyusui from '../assets/ikonibumenyusui.png';
import ikonbayi from '../assets/ikonbayi.png';
import ikonbalita from '../assets/ikonbalita.png';
import ikonanaksekolah from '../assets/ikonanaksekolah.png';
import ikonremaja from '../assets/ikonremaja.png';
import ikondewasa from '../assets/ikondewasa.png';
import ikonlansia from '../assets/ikonlansia.png';
import { Link } from 'react-router-dom';

export default function Information() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  useEffect(() => {
    if (selectedGroup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedGroup(null);
      }
    };

    if (selectedGroup) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedGroup]);

  // GSAP animation when active filter changes
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-info-card',
        { opacity: 0, y: 24, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const ageGroups = [
    { 
      id: 'ibu-hamil', 
      title: 'Ibu Hamil', 
      icon: ikonibuhamil,
      image: ibuhamil,
      summary: 'Ibu hamil membutuhkan tambahan energi dan zat gizi untuk mendukung pertumbuhan janin, pembentukan plasenta, peningkatan volume darah, dan perubahan jaringan tubuh ibu. Kekurangan gizi pada masa ini meningkatkan risiko anemia, bayi berat lahir rendah, dan gangguan perkembangan janin.',
      goals: [
        'Mendukung pertumbuhan dan perkembangan janin',
        'Mencegah anemia dan kekurangan energi kronis',
        'Menurunkan risiko komplikasi kehamilan'
      ],
      nutrients: [
        'Energi meningkat sesuai trimester',
        'Protein untuk pembentukan jaringan janin',
        'Zat besi untuk pembentukan sel darah merah',
        'Asam folat untuk mencegah cacat tabung saraf',
        'Kalsium dan vitamin D untuk pembentukan tulang',
        'Iodium untuk perkembangan otak janin'
      ],
      problems: [
        'Anemia defisiensi besi',
        'Kekurangan energi kronis',
        'Peningkatan berat badan tidak sesuai rekomendasi'
      ],
      recommendations: [
        'Makan 3 kali sehari dengan 1–2 kali selingan',
        'Konsumsi lauk hewani setiap hari',
        'Perbanyak sayur hijau dan buah',
        'Minum tablet tambah darah sesuai anjuran',
        'Lakukan pemeriksaan kehamilan rutin',
        'Pilih makanan yang aman dikonsumsi dan dimasak hingga matang sempurna',
        'Hindari konsumsi alkohol selama kehamilan'
      ],
      faq: {
        q: 'Apakah ibu hamil harus makan dua kali lipat?',
        a: 'Tidak. Fokus pada kualitas dan kecukupan zat gizi, bukan pada jumlah berlebihan.'
      }
    },
    { 
      id: 'ibu-menyusui', 
      title: 'Ibu Menyusui', 
      icon: ikonibumenyusui,
      image: ibumenyusui,
      summary: 'Ibu menyusui membutuhkan tambahan energi dan cairan untuk produksi ASI. Kualitas asupan ibu memengaruhi status gizi ibu dan keberlanjutan menyusui.',
      goals: [
        'Mendukung produksi ASI optimal',
        'Menjaga status gizi ibu',
        'Mencegah kelelahan dan dehidrasi'
      ],
      nutrients: [
        'Energi dan protein lebih tinggi dibanding sebelum hamil',
        'Cairan yang cukup sesuai kebutuhan tubuh',
        'Kalsium dan vitamin D',
        'Vitamin A dan zat besi'
      ],
      problems: [
        'Asupan energi kurang',
        'Kurang cairan',
        'Penurunan berat badan berlebihan'
      ],
      recommendations: [
        'Konsumsi makanan beragam',
        'Tambahkan 1 porsi lauk hewani',
        'Minum saat merasa haus dan setiap kali selesai menyusui untuk membantu memenuhi kebutuhan cairan',
        'Istirahat cukup'
      ],
      faq: {
        q: 'Apakah makanan pedas memengaruhi ASI?',
        a: 'Tidak secara langsung. Namun, perhatikan respons bayi setelah menyusu.'
      }
    },
    { 
      id: 'bayi', 
      title: 'Bayi (0-12 Bulan)', 
      icon: ikonbayi,
      image: bayi,
      summary: 'Periode 1000 hari pertama kehidupan sangat menentukan kualitas pertumbuhan. ASI eksklusif dan MPASI yang tepat membantu mencegah stunting dan anemia.',
      goals: [
        'Mendukung pertumbuhan optimal',
        'Mencegah stunting dan anemia',
        'Meningkatkan daya tahan tubuh'
      ],
      nutrients: [
        'Protein hewani',
        'Zat besi',
        'Lemak sebagai sumber energi utama'
      ],
      problems: [
        'Berat badan tidak naik',
        'Anemia',
        'Infeksi berulang'
      ],
      recommendations: [
        'Berikan ASI eksklusif selama usia 0–6 bulan tanpa tambahan makanan atau minuman lain, kecuali atas indikasi medis',
        'Mulai MPASI pada usia 6 bulan',
        'Berikan MPASI kaya protein hewani',
        'Tingkatkan frekuensi makan sesuai usia',
        'Pantau pertumbuhan setiap bulan'
      ],
      faq: {
        q: 'Apakah bayi boleh diberi gula dan garam?',
        a: 'Tidak dianjurkan menambahkan gula dan garam pada makanan bayi sebelum usia 1 tahun.'
      }
    },
    { 
      id: 'balita', 
      title: 'Balita (1-5 Tahun)', 
      icon: ikonbalita,
      image: balita,
      summary: 'Balita mengalami pertumbuhan pesat. Asupan gizi seimbang berperan penting untuk mencegah stunting dan gizi kurang.',
      goals: [
        'Mendukung pertumbuhan dan perkembangan optimal',
        'Mencegah stunting',
        'Meningkatkan daya tahan tubuh'
      ],
      nutrients: [
        'Energi cukup',
        'Protein hewani harian',
        'Zat besi, seng, dan vitamin A'
      ],
      problems: [
        'Stunting',
        'Berat badan kurang',
        'Konsumsi camilan tinggi gula'
      ],
      recommendations: [
        'Terapkan isi piring seimbang',
        'Berikan makanan beragam',
        'Berikan protein hewani setiap hari sebagai bagian dari pola makan bergizi seimbang',
        'Batasi makanan ultra proses',
        'Rutin ke posyandu'
      ],
      faq: {
        q: 'Balita sulit makan, apa yang harus dilakukan?',
        a: 'Berikan porsi kecil dengan frekuensi lebih sering dan variasi menu.'
      }
    },
    { 
      id: 'anak-sekolah', 
      title: 'Anak Sekolah (6-12 Tahun)', 
      icon: ikonanaksekolah,
      image: anaksekolah,
      summary: 'Anak sekolah membutuhkan energi untuk mendukung aktivitas belajar dan fisik. Sarapan berperan penting dalam menjaga konsentrasi.',
      goals: [
        'Mendukung aktivitas belajar',
        'Meningkatkan konsentrasi',
        'Mencegah anemia'
      ],
      nutrients: [
        'Karbohidrat kompleks',
        'Protein',
        'Zat besi',
        'Serat'
      ],
      problems: [
        'Anemia',
        'Kebiasaan jajan tinggi gula',
        'Kurang aktivitas fisik'
      ],
      recommendations: [
        'Biasakan sarapan setiap hari',
        'Bawa bekal sehat',
        'Batasi minuman manis',
        'Perbanyak konsumsi buah dan sayur',
        'Cukupi kebutuhan air putih setiap hari',
        'Lakukan aktivitas fisik secara rutin'
      ],
      faq: {
        q: 'Apakah anak boleh minum minuman manis setiap hari?',
        a: 'Tidak. Batasi konsumsi gula harian.'
      }
    },
    { 
      id: 'remaja', 
      title: 'Remaja', 
      icon: ikonremaja,
      image: remaja,
      summary: 'Remaja mengalami percepatan pertumbuhan dan perubahan hormonal. Pada fase ini, kebutuhan gizi meningkat dan risiko anemia serta obesitas perlu diperhatikan.',
      goals: [
        'Mendukung pertumbuhan optimal',
        'Mencegah anemia',
        'Menjaga berat badan ideal'
      ],
      nutrients: [
        'Protein',
        'Zat besi, terutama pada remaja putri',
        'Kalsium',
        'Energi sesuai aktivitas'
      ],
      problems: [
        'Anemia',
        'Obesitas',
        'Pola makan tidak teratur'
      ],
      recommendations: [
        'Konsumsi lauk hewani dan sayur',
        'Batasi makanan cepat saji',
        'Lakukan aktivitas fisik minimal 60 menit per hari pada remaja usia 5–17 tahun atau sesuaikan dengan usia dan kondisi individu',
        'Hindari diet ekstrem'
      ],
      faq: {
        q: 'Apakah diet ketat aman untuk remaja?',
        a: 'Tidak dianjurkan tanpa pengawasan tenaga kesehatan.'
      }
    },
    { 
      id: 'dewasa', 
      title: 'Dewasa', 
      icon: ikondewasa,
      image: dewasa,
      summary: 'Pada usia dewasa, fokus utama adalah menjaga keseimbangan gizi untuk mempertahankan kesehatan dan mencegah penyakit tidak menular.',
      goals: [
        'Menjaga berat badan ideal',
        'Mencegah penyakit kronis',
        'Mendukung produktivitas'
      ],
      nutrients: [
        'Protein cukup',
        'Serat minimal 25–30 gram per hari',
        'Lemak sehat',
        'Pembatasan gula, garam, dan lemak'
      ],
      problems: [
        'Obesitas',
        'Hipertensi',
        'Diabetes tipe 2'
      ],
      recommendations: [
        'Batasi gula maksimal 50 gram atau sekitar 4 sendok makan per hari',
        'Batasi garam maksimal 5 gram atau sekitar 1 sendok teh per hari',
        'Batasi konsumsi lemak sesuai anjuran gizi seimbang',
        'Konsumsi makanan beragam',
        'Lakukan aktivitas fisik minimal 150 menit per minggu'
      ],
      faq: {
        q: 'Apakah nasi menyebabkan diabetes?',
        a: 'Konsumsi berlebihan dan kurang aktivitas fisik dapat meningkatkan risiko diabetes. Risiko tersebut tidak ditentukan oleh satu jenis makanan saja.'
      }
    },
    { 
      id: 'lansia', 
      title: 'Lansia', 
      icon: ikonlansia,
      image: lansia,
      summary: 'Lansia berisiko mengalami penurunan massa otot dan kepadatan tulang. Asupan gizi yang tepat membantu menjaga kualitas hidup dan mencegah penyakit degeneratif.',
      goals: [
        'Menjaga massa otot',
        'Mencegah osteoporosis',
        'Mengontrol penyakit kronis'
      ],
      nutrients: [
        'Protein pada setiap waktu makan',
        'Kalsium dan vitamin D',
        'Serat dan cairan'
      ],
      problems: [
        'Nafsu makan menurun',
        'Osteoporosis',
        'Penyakit kronis'
      ],
      recommendations: [
        'Pilih makanan yang mudah dikunyah',
        'Konsumsi protein dalam porsi kecil namun rutin',
        'Pastikan kebutuhan energi tetap tercukupi untuk membantu mencegah malnutrisi',
        'Perbanyak cairan',
        'Tetap aktif sesuai kemampuan'
      ],
      faq: {
        q: 'Apakah lansia perlu suplemen?',
        a: 'Tergantung pada kondisi kesehatan dan kebutuhan masing-masing individu. Konsultasikan dengan tenaga kesehatan sebelum mengonsumsi suplemen.'
      }
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen transition-colors duration-300 bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden py-20 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-amber-500/5 dark:from-primary/10 dark:via-slate-900/10 dark:to-slate-900/10">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-teal-300/15 blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-emerald-300/15 blur-3xl pointer-events-none animate-float-slower" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl transition-colors duration-300"
          >
            Pusat Informasi <span className="gradient-text-primary">Gizi Kesehatan Masyarakat</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-4 text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300"
          >
            Panduan nutrisi lengkap untuk setiap tahapan kehidupan, mulai dari masa kehamilan hingga lanjut usia.
          </motion.p>
        </div>
      </header>

      {/* Importance Section */}
      <section className="relative w-full overflow-hidden py-12 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 min-h-[540px] sm:min-h-[600px] flex items-center justify-center bg-white dark:bg-slate-900 transition-colors duration-300">
        {/* Full-width Background Image - Fully visible & responsive */}
        <img 
          src={display2} 
          alt="Healthy Food Illustration" 
          className="absolute inset-0 w-full h-full object-cover dark:brightness-90 transition-all duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Very Subtle Vignette for Contrast */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center justify-center">
          {/* Overlaid Centered Frosted Glass Box - Translucent so background shows through */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl w-full mx-auto text-center flex flex-col items-center justify-center bg-white/60 dark:bg-slate-900/65 backdrop-blur-md sm:backdrop-blur-lg rounded-3xl p-6 sm:p-8 md:p-10 border border-white/80 dark:border-slate-700/80 shadow-2xl space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white transition-colors duration-300">
              Mengapa Gizi Masyarakat Penting?
            </h2>
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed transition-colors duration-300">
              Kesehatan sebuah bangsa berakar pada piring makannya. Pemenuhan gizi yang tepat bukan sekadar kenyang, melainkan investasi masa depan.
            </p>
            <ul className="space-y-4 w-full text-left">
              {[
                { icon: <ShieldCheck className="text-primary h-6 w-6" />, title: 'Pencegahan Penyakit', desc: 'Mengurangi risiko penyakit degeneratif seperti diabetes dan hipertensi.' },
                { icon: <Brain className="text-primary h-6 w-6" />, title: 'Kualitas SDM', desc: 'Meningkatkan kecerdasan dan produktivitas generasi penerus bangsa.' },
                { icon: <BicepsFlexed className="text-primary h-6 w-6" />, title: 'Ketahanan Nasional', desc: 'Masyarakat yang sehat adalah pilar utama kekuatan negara.' },
              ].map((item, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="flex items-start bg-slate-50/80 dark:bg-slate-800/60 p-3.5 sm:p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm"
                >
                  <div className="mr-3 shrink-0 mt-0.5">{item.icon}</div>
                  <span className="text-slate-800 dark:text-slate-100 text-sm sm:text-base leading-snug">
                    <strong className="font-bold text-slate-900 dark:text-white">{item.title}:</strong> {item.desc}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section - Distinct Section Divider */}
      <section className="py-20 bg-emerald-50/60 dark:bg-slate-900/80 border-y border-emerald-100/80 dark:border-slate-800/80 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white transition-colors duration-300">Pilar Utama Kesehatan Nutrisi</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300 transition-colors duration-300 max-w-xl mx-auto">Tiga elemen fundamental untuk mencapai kualitas hidup optimal.</p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { icon: <Utensils className="h-10 w-10 text-primary" />, title: 'Gizi Seimbang', desc: 'Proporsi nutrisi yang tepat antara karbohidrat, protein, lemak, dan mikronutrisi.' },
              { icon: <Droplets className="h-10 w-10 text-primary" />, title: 'Hidrasi Optimal', desc: 'Menjaga keseimbangan cairan tubuh untuk metabolisme dan fungsi kognitif yang baik.' },
              { icon: <Dumbbell className="h-10 w-10 text-primary" />, title: 'Gaya Hidup Aktif', desc: 'Aktivitas fisik rutin untuk mendukung pembakaran energi dan kesehatan jantung.' },
            ].map((pillar, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="bg-white/90 dark:bg-slate-950/80 p-8 rounded-2xl shadow-md border border-emerald-100 dark:border-slate-800/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">{pillar.title}</h3>
                <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed transition-colors duration-300">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Age Groups */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white transition-colors duration-300">
              Kategori Gizi Berdasarkan Tahapan Usia
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-350 max-w-2xl mx-auto transition-colors duration-300">
              Pilih atau filter tahapan usia di bawah ini untuk melihat panduan gizi lengkap berupa tujuan, zat gizi utama, masalah umum, rekomendasi pola makan, dan FAQ.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="mb-12 flex flex-wrap gap-3 justify-center px-2 select-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`group flex items-center gap-2.5 py-2.5 px-4.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border backdrop-blur-sm cursor-pointer active:scale-95 ${
                activeFilter === 'all'
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 hover:text-primary dark:hover:text-primary hover:border-primary/40 dark:hover:border-primary/40 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5'
              }`}
            >
              <div className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${activeFilter === 'all' ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                <Utensils className="h-3.5 w-3.5" />
              </div>
              <span>Semua Kategori</span>
            </button>

            {ageGroups.map((group) => {
              const isActive = activeFilter === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => setActiveFilter(group.id)}
                  className={`group flex items-center gap-2.5 py-2.5 px-4.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border backdrop-blur-sm cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-[1.02]'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/60 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 hover:text-primary dark:hover:text-primary hover:border-primary/40 dark:hover:border-primary/40 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/5'
                  }`}
                >
                  <div className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-110 ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-950 shadow-sm'}`}>
                    <img 
                      src={group.icon} 
                      alt="" 
                      className={`h-4.5 w-4.5 object-contain transition-transform duration-300 ${isActive ? 'brightness-100' : 'opacity-85'}`}
                    />
                  </div>
                  <span>{group.title}</span>
                </button>
              );
            })}
          </div>

          <motion.div 
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {ageGroups
              .filter((group) => activeFilter === 'all' || group.id === activeFilter)
              .map((section) => (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="gsap-info-card group relative flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/60 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedGroup(section)}
                >
                  {/* Image on top - Contained style so illustration is not cut off */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-50 dark:bg-slate-950/45 flex items-center justify-center p-4">
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className="max-w-full max-h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500 ease-out dark:brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Body details */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white transition-colors duration-300">
                        {section.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
                        {section.summary}
                      </p>
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroup(section);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-800 dark:text-slate-300 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-sm border border-slate-100 dark:border-slate-800/85 hover:border-primary dark:hover:border-primary group-hover:shadow-md cursor-pointer"
                    >
                      <span>Lihat Selengkapnya</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
          </motion.div>

        </div>
      </section>

      {/* AI Chatbot Promotion Section (Full-Width Divider) */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-primary text-white transition-colors duration-300 relative overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
            Butuh informasi lebih detail?
          </h2>

          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tanyakan langsung pada asisten AI kami untuk mendapatkan saran gizi yang personal dan akurat.
          </p>

          <div className="pt-2">
            <Link to="/qa" className="bg-white text-primary hover:bg-slate-50 px-8 py-4 rounded-2xl text-base sm:text-lg font-extrabold shadow-xl hover:scale-105 transition-transform inline-flex items-center gap-3">
              <img src={ikonchatbot} alt="Chatbot" className="h-7 w-7 object-contain" />
              <span>Coba Tanya AI</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Detail Modal Component */}
      <AnimatePresence>
        {selectedGroup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop-blur overlay with motion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGroup(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal card with responsive screen constraints */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[78vh] z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button floating top-right */}
              <button
                onClick={() => setSelectedGroup(null)}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/60 hover:bg-rose-600 hover:scale-105 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer shadow-lg active:scale-95 flex items-center justify-center h-10 w-10"
                aria-label="Tutup"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Side: Modal Banner (Landscape mode) */}
              <div className="relative h-56 sm:h-64 md:h-full md:w-[38%] overflow-hidden bg-slate-950 shrink-0 select-none flex items-center justify-center p-6 md:p-8">
                <img 
                  src={selectedGroup.image} 
                  alt={selectedGroup.title} 
                  className="max-w-full max-h-[80%] md:max-h-[60%] object-contain rounded-3xl dark:brightness-95 z-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent z-10"></div>
                
                <div className="absolute bottom-6 left-6 right-6 md:top-0 md:left-0 md:right-0 md:p-8 md:flex md:flex-col md:justify-end md:h-full flex items-center gap-4 z-20">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/95 dark:bg-slate-900/95 p-2.5 shadow-lg flex items-center justify-center border border-white/20 dark:border-slate-800 shrink-0">
                    <img 
                      src={selectedGroup.icon} 
                      alt="" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 md:mt-4">
                    <span className="inline-block text-[10px] font-black uppercase tracking-[0.2em] text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                      Kategori Gizi
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white drop-shadow-md leading-tight">{selectedGroup.title}</h2>
                  </div>
                </div>
              </div>

              {/* Right Side: Modal Content - Scrollable */}
              <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div className="p-6 sm:p-8 md:p-10 space-y-8 overflow-y-auto custom-scrollbar flex-1">
                  {/* Summary / Ringkasan */}
                  <div className="p-5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/50 space-y-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary">
                      Ringkasan
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-medium">{selectedGroup.summary}</p>
                  </div>

                  {/* Goals, Nutrients, Problems Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Tujuan Gizi */}
                    <div className="p-5 bg-sky-50/50 dark:bg-sky-950/15 rounded-2xl border border-sky-100/50 dark:border-sky-900/30 transition-all duration-300">
                      <h4 className="font-bold text-sky-900 dark:text-sky-300 mb-4 text-sm flex items-center gap-2">
                        <Target className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                        Tujuan Gizi
                      </h4>
                      <ul className="space-y-3">
                        {selectedGroup.goals.map((goal: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400 mt-2 shrink-0" />
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Zat Gizi Utama */}
                    <div className="p-5 bg-teal-50/40 dark:bg-teal-950/15 rounded-2xl border border-teal-100/50 dark:border-teal-900/30 transition-all duration-300">
                      <h4 className="font-bold text-teal-900 dark:text-teal-300 mb-4 text-sm flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                        Zat Gizi Utama
                      </h4>
                      <ul className="space-y-3">
                        {selectedGroup.nutrients.map((nutrient: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
                            <span>{nutrient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Masalah Umum */}
                    <div className="p-5 bg-rose-50/55 dark:bg-rose-950/15 rounded-2xl border border-rose-100/50 dark:border-rose-900/30 transition-all duration-300">
                      <h4 className="font-bold text-rose-900 dark:text-rose-300 mb-4 text-sm flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                        Masalah Umum
                      </h4>
                      <ul className="space-y-3">
                        {selectedGroup.problems.map((problem: string, i: number) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                            <span>{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="p-6 sm:p-8 bg-emerald-50/40 dark:bg-emerald-950/15 rounded-2xl border border-emerald-100/50 dark:border-emerald-900/30 transition-colors duration-300">
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-300 mb-5 text-sm flex items-center gap-2 uppercase tracking-wider">
                      <Utensils className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Rekomendasi Pola Makan
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedGroup.recommendations.map((rec: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 text-slate-700 dark:text-slate-200 text-sm">
                          <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <span className="text-[10px] font-black">✓</span>
                          </div>
                          <span className="leading-relaxed">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300">
                    <div className="flex items-start gap-3.5">
                      <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-sm border border-amber-100 dark:border-amber-900/20">
                        <HelpCircle className="h-5 w-5" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">
                          {selectedGroup.faq.q}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                          {selectedGroup.faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Selesai Membaca Button inside Modal Bottom Footer */}
                <div className="p-4 md:px-10 md:py-5 border-t border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex justify-end shrink-0 z-10 shadow-[0_-8px_24px_-10px_rgba(0,0,0,0.05)]">
                  <button
                    onClick={() => setSelectedGroup(null)}
                    className="flex items-center gap-2 py-3.5 px-7 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-wider transition-all duration-300 hover:brightness-110 shadow-lg shadow-primary/25 cursor-pointer active:scale-98"
                  >
                    <span>Selesai Membaca</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

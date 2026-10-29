import gizilogo from '../assets/gizilogo.png';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-primary/10 bg-white dark:bg-slate-950 px-4 md:px-10 lg:px-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-6 text-center">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg">
            <img src={gizilogo} alt="TanyaGizi Logo" className="h-12 w-auto dark:brightness-110" referrerPolicy="no-referrer" />
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300">TanyaGizi</span>
        </div>
        
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors duration-300">
          © 2026 @ Skripsi Semester Ganjil 2026/2027 - Aliyah Zahrah
        </p>
        
        <div className="flex gap-6 text-slate-400 dark:text-slate-500 text-sm transition-colors duration-300">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

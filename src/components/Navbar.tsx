import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import gizilogo from '../assets/gizilogo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('theme');
        if (saved) return saved === 'dark';
      } catch (e) {
        console.warn('LocalStorage is blocked or unavailable:', e);
      }
      try {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      } catch (e) {
        return false;
      }
    }
    return false;
  });
  const location = useLocation();

  useEffect(() => {
    try {
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      console.warn('Failed to commit theme to localStorage:', e);
      // Fallback state change without setting localStorage
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Q&A', path: '/qa' },
    { name: 'Information', path: '/information' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 bg-white/75 dark:bg-slate-950/75 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 px-4 md:px-10 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-1 rounded-xl group-hover:bg-primary/5 transition-all duration-300">
            <img src={gizilogo} alt="TanyaGizi Logo" className="h-12 w-auto dark:brightness-110" referrerPolicy="no-referrer" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">
            <span className="text-slate-900 dark:text-white transition-colors duration-300">Tanya</span>
            <span className="text-primary">Gizi</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 bg-slate-100/80 dark:bg-slate-950/30 p-1.5 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 dark:bg-slate-900/60 shadow-inner">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-sm font-semibold transition-colors duration-300"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white dark:bg-slate-850 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-800 dark:shadow-md dark:bg-slate-800"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${
                  isActive 
                    ? 'text-primary dark:text-primary font-bold' 
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Right Section containing Theme Toggle & Mobile Trigger */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-850 text-slate-700 dark:text-slate-200 transition-all duration-300 shadow-sm active:scale-95"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-amber-500 animate-[spin_40s_linear_infinite]" />
            ) : (
              <Moon className="h-5 w-5 text-indigo-600" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-850 text-slate-900 dark:text-slate-100 transition-all shadow-sm active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl border border-slate-100 dark:border-slate-900 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-2 p-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-bold transition-all duration-200 ${
                      isActive 
                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground' 
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

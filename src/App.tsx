import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import QA from './pages/QA';
import Information from './pages/Information';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 transition-colors duration-300 selection:bg-primary/30 selection:text-primary-foreground">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/qa" element={<QA />} />
            <Route path="/information" element={<Information />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

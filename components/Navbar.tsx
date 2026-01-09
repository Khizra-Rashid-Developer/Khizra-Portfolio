import React, { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;
    
    // Cache section elements to avoid DOM querying on every scroll
    const sections = ['skills', 'projects', 'certifications', 'contact'];
    const sectionElements = sections.map(id => ({
        id,
        element: document.getElementById(id)
    })).filter(item => item.element !== null);

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          const scrollY = window.scrollY;
          let current = '';
          
          // Efficient check
          for (const section of sectionElements) {
            if (section.element && scrollY >= (section.element.offsetTop - 300)) {
              current = section.id;
            }
          }
          setActiveSection(current);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav id="main-navbar" className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none">
      <div className={`
        pointer-events-auto
        transition-all duration-500 ease-in-out will-change-transform
        ${scrolled 
          ? 'w-[95%] md:w-auto glass-panel rounded-full py-3 px-8' 
          : 'w-full max-w-7xl bg-transparent py-6 px-4'
        }
      `}>
        <div className="flex items-center justify-between gap-8">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
             <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-11 h-11 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
                   <span className="font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-xl">KR</span>
                </div>
             </div>
             <span className={`font-heading font-bold text-lg text-slate-100 tracking-tight transition-all duration-500 ${scrolled ? 'hidden lg:block opacity-0 lg:opacity-100 w-0 lg:w-auto' : 'block opacity-100'}`}>
                Khizra Rashid
             </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
               const isActive = activeSection === link.href.substring(1) || (link.href === '#' && activeSection === '');
               return (
                <a 
                    key={link.name} 
                    href={link.href} 
                    className={`relative px-5 py-2 text-sm font-semibold transition-all rounded-full group ${isActive ? 'text-slate-50' : 'text-slate-400 hover:text-indigo-500'}`}
                >
                    {isActive && (
                        <span className="absolute inset-0 bg-slate-100/10 rounded-full -z-10 animate-fade-in-up"></span>
                    )}
                    {link.name}
                    {isActive && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-400 rounded-full shadow-[0_0_10px_#818cf8]"></span>}
                </a>
               )
            })}
            <div className="w-px h-6 bg-slate-700/50 mx-4"></div>
            <a 
              href="cv.pdf" 
              download 
              className="flex items-center gap-2 bg-slate-100 text-slate-950 hover:bg-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2.5 text-slate-300 hover:text-slate-100 bg-slate-800/50 border border-slate-700/50 rounded-full transition-colors backdrop-blur-md"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden fixed inset-x-4 top-24 glass-panel rounded-3xl p-4 transition-all duration-300 origin-top shadow-2xl pointer-events-auto overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-5 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-slate-50 hover:bg-indigo-600/20 hover:border hover:border-indigo-500/30 transition-all border border-transparent"
            >
              {link.name}
            </a>
          ))}
          <a
            href="cv.pdf"
            download
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-4 rounded-2xl font-bold mt-2 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
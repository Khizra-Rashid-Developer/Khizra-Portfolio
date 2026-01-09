import React, { useState } from 'react';
import { MapPin, Github, Linkedin, Mail, Database, ArrowUpRight, Copy, Check, Download, Globe } from 'lucide-react';
import CodeTerminal from './CodeTerminal';
import { PERSONAL_INFO } from '../constants';
import MagneticWrapper from './MagneticWrapper';
import confetti from 'canvas-confetti';

const BentoGrid: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setEmailCopied(true);
    
    // User Action Animation: Confetti Burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
        origin: { x, y },
        particleCount: 50,
        spread: 60,
        colors: ['#6366f1', '#a855f7', '#ffffff']
    });

    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="bento-section" className="py-12 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px]">
        
        {/* Card 1: Main Intro (Large) */}
        <div className="md:col-span-2 lg:col-span-2 row-span-2 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-500">
            {/* Spotlight Effect */}
            <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="absolute top-0 right-0 p-32 bg-indigo-600/20 blur-[100px] rounded-full group-hover:bg-indigo-600/30 transition-all"></div>
            
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    Available for work
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-100 mb-2 leading-tight">
                    Code with <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Purpose.</span>
                </h2>
                <p className="text-slate-400 max-w-sm mt-4">
                    Crafting intelligent solutions using Python and AI to bridge the gap between data and decision-making.
                </p>
            </div>
            
            <div className="flex gap-3 mt-6 relative z-10">
                 <MagneticWrapper>
                    <a 
                        href="#contact" 
                        className="ripple-btn inline-block px-6 py-2.5 bg-slate-50 text-slate-950 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        Hire Me
                    </a>
                 </MagneticWrapper>
                 <MagneticWrapper>
                    <a 
                        href="#projects" 
                        onClick={handleViewWork}
                        className="ripple-btn inline-block px-6 py-2.5 bg-slate-800 text-slate-100 rounded-full font-bold text-sm border border-slate-700 hover:bg-slate-700 hover:border-slate-500 transition-all"
                    >
                        View Work
                    </a>
                 </MagneticWrapper>
            </div>
        </div>

        {/* Card 2: Code Terminal */}
        <div className="md:col-span-1 lg:col-span-2 row-span-2">
            <CodeTerminal />
        </div>

        {/* Card 3: Location */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-colors group relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start relative z-10">
                <div className="p-3 bg-slate-800/50 rounded-2xl text-indigo-400 group-hover:text-slate-100 group-hover:bg-indigo-500 transition-colors shadow-inner">
                    <MapPin className="w-6 h-6" />
                </div>
                <div className="flex gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse"></span>
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse delay-75"></span>
                     <span className="w-1.5 h-1.5 rounded-full bg-slate-600 animate-pulse delay-150"></span>
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Based In</p>
                <p className="text-xl font-bold text-slate-100 group-hover:translate-x-1 transition-transform">Hyderabad, Pakistan</p>
            </div>
            {/* World Map decoration hint */}
            <div className="absolute bottom-0 right-0 opacity-10 transform translate-y-1/4 translate-x-1/4">
                <Globe className="w-24 h-24 text-slate-400" />
            </div>
        </div>

        {/* Card 4: Focus */}
        <div className="glass-panel rounded-3xl p-6 flex flex-col justify-between hover:border-purple-500/50 transition-colors group relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="flex justify-between items-start relative z-10">
                <div className="p-3 bg-slate-800/50 rounded-2xl text-purple-400 group-hover:text-slate-100 group-hover:bg-purple-500 transition-colors shadow-inner">
                    <Database className="w-6 h-6" />
                </div>
                <div className="bg-slate-800/50 p-1.5 rounded-full group-hover:bg-purple-500/20 transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-300 transition-colors" />
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-1">Core Focus</p>
                <p className="text-xl font-bold text-slate-100">Data Science & AI</p>
            </div>
        </div>

        {/* Card 5: Connect / Socials - Expanded and Styled */}
        <div className="md:col-span-2 lg:col-span-2 glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/30 z-0"></div>
            
            {/* Animated Gradient Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-indigo-500/20 transition-all duration-700"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-slate-100 mb-2">Let's work together</h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto md:mx-0">
                        Have a project in mind? Let's turn your idea into reality.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleCopyEmail}
                        className="group/btn relative px-4 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 border border-slate-700 hover:border-indigo-500 transition-all flex items-center gap-2 text-slate-300 hover:text-white"
                        title="Copy Email"
                    >
                        {emailCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5 text-slate-300 group-hover/btn:text-white" />}
                        <span className="text-sm font-medium hidden sm:block">
                            {emailCopied ? 'Copied!' : 'Copy Email'}
                        </span>
                    </button>
                    
                    <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>

                    <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-xl hover:bg-black hover:text-white hover:border-slate-600 border border-slate-700 transition-all hover:-translate-y-1 shadow-lg">
                        <Github className="w-5 h-5 text-slate-300 group-hover:text-white" />
                    </a>
                    <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-xl hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] border border-slate-700 transition-all hover:-translate-y-1 shadow-lg">
                        <Linkedin className="w-5 h-5 text-slate-300 group-hover:text-white" />
                    </a>
                     <a href="cv.pdf" download className="p-3 bg-indigo-600 rounded-xl hover:bg-indigo-500 text-white border border-indigo-500 transition-all hover:-translate-y-1 shadow-[0_0_15px_rgba(99,102,241,0.4)]" title="Download Resume">
                        <Download className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
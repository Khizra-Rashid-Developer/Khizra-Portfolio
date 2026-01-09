import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Github, Brain, Code2, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import MagneticWrapper from './MagneticWrapper';

interface HeroProps {
  onProfileClick?: (src: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onProfileClick }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [imgError, setImgError] = useState(false); // State for image error
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const roles = ["Python Developer", "AI Enthusiast", "Data Scientist"];

  // Typewriter Effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, roles, typingSpeed]);

  // Interactive Particle Network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];
    // OPTIMIZATION: Hard cap particle count to 30 to prevent lag
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 30); 

    for(let i=0; i<particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3, // Slower for elegance
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 0.5
        });
    }

    const onMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const animate = () => {
        ctx.clearRect(0,0,width,height);
        
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if(p.x < 0 || p.x > width) p.vx *= -1;
            if(p.y < 0 || p.y > height) p.vy *= -1;

            const dx = mouseRef.current.x - p.x;
            const dy = mouseRef.current.y - p.y;
            // Check square distance first to avoid sqrt
            const distSq = dx*dx + dy*dy;
            
            if (distSq < 40000) { // 200 * 200
                const dist = Math.sqrt(distSq);
                const angle = Math.atan2(dy, dx);
                const force = (200 - dist) / 200;
                p.x -= Math.cos(angle) * force * 0.5;
                p.y -= Math.sin(angle) * force * 0.5;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(165, 180, 252, ${0.4 + (Math.sin(Date.now() * 0.003 + i) * 0.2)})`;
            ctx.fill();

            for(let j=i+1; j<particles.length; j++) {
                const p2 = particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const distSq2 = dx2*dx2 + dy2*dy2;
                
                if(distSq2 < 22500) { // 150 * 150
                    const dist2 = Math.sqrt(distSq2);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(129, 140, 248, ${0.15 * (1 - dist2/150)})`; 
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    
    const animId = requestAnimationFrame(animate);
    
    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    // Throttle resize
    let resizeTimer: number;
    const throttledResize = () => {
        if(resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 100);
    }

    window.addEventListener('resize', throttledResize, { passive: true });

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', throttledResize);
        window.removeEventListener('mousemove', onMouseMove);
    }
  }, []);

  return (
    <section id="hero-section" className="relative pt-36 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center min-h-screen overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-0"
      />

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        <div className="space-y-10 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel text-indigo-400 text-sm font-bold animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            <span>Khizra Rashid Portfolio</span>
          </div>
          
          {/* Heading with Solid Color */}
          <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-slate-50 tracking-tight leading-[1.05] drop-shadow-2xl">
            I build <br />
            <span 
              className="text-indigo-400"
            >
              {text}
            </span>
            <span className="animate-pulse text-indigo-400 ml-1">_</span>
          </h1>
          
          <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
             <p className="text-xl text-slate-300 leading-relaxed font-light">
                {PERSONAL_INFO.about}
             </p>
          </div>
          
          <div className="flex flex-wrap gap-6 pt-4">
            <MagneticWrapper>
                <a href="#projects" className="ripple-btn relative group inline-flex items-center justify-center px-8 py-4 bg-slate-950 font-bold text-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 rounded-full overflow-hidden shadow-xl hover:shadow-indigo-500/20 border border-slate-800">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                    <div className="absolute inset-[2px] bg-slate-950 rounded-full flex items-center justify-center transition-colors group-hover:bg-slate-900"></div>
                    <span className="relative flex items-center gap-2 group-hover:text-indigo-300 transition-colors z-10">
                        View Projects <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </a>
            </MagneticWrapper>

            <MagneticWrapper>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="ripple-btn px-8 py-4 border border-slate-700 glass-panel text-slate-100 rounded-full font-semibold hover:border-indigo-500 hover:text-indigo-400 transition-all flex items-center gap-3 group shadow-lg">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                GitHub
                </a>
            </MagneticWrapper>
          </div>
        </div>

        <div className="relative order-1 md:order-2 flex justify-center animate-float h-[500px] items-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          
          <div className="absolute w-[480px] h-[480px] border border-indigo-500/20 rounded-full animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[4px] w-3 h-3 bg-indigo-400 rounded-full shadow-[0_0_15px_#818cf8]"></div>
          </div>
          <div className="absolute w-[380px] h-[380px] border border-purple-500/20 rounded-full animate-reverse-spin">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[4px] w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_#c084fc]"></div>
          </div>

          <div 
            className="relative w-72 h-72 md:w-80 md:h-80 group perspective-1000 z-10 cursor-default"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-spin-slow"></div>
            
            <div className={`w-full h-full rounded-full p-1.5 bg-slate-950 relative z-10 overflow-hidden ${imgError ? 'flex items-center justify-center' : ''}`}>
               {!imgError ? (
                  <img 
                    src="mypic.jpeg" 
                    alt="Khizra Rashid" 
                    className="w-full h-full rounded-full object-cover border-2 border-slate-800 shadow-2xl"
                    onError={() => setImgError(true)}
                  />
               ) : (
                  <span className="text-6xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-400">KR</span>
               )}
            </div>

            <div className="absolute -top-6 -right-6 glass-panel p-4 rounded-2xl shadow-2xl animate-bounce delay-700 z-20 hover:scale-110 transition-transform border-indigo-500/30">
                <Brain className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass-panel p-4 rounded-2xl shadow-2xl animate-bounce delay-150 z-20 hover:scale-110 transition-transform border-pink-500/30">
                <Code2 className="w-8 h-8 text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 text-slate-500 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => document.getElementById('skills')?.scrollIntoView({behavior: 'smooth'})}>
        <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll to explore</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
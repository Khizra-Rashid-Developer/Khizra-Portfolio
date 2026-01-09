import React, { useEffect, useState } from 'react';
import { Cpu, Fingerprint } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('INITIALIZING SYSTEM');

  useEffect(() => {
    const texts = [
      'LOADING ASSETS...',
      'CONNECTING NEURAL NET...',
      'CALIBRATING INTERFACE...',
      'ACCESS GRANTED'
    ];
    let textIdx = 0;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        
        // Random jumps for "hacker" feel
        return Math.min(prev + Math.random() * 5, 100);
      });
    }, 100);

    const textInterval = setInterval(() => {
      if (textIdx < texts.length) {
        setText(texts[textIdx]);
        textIdx++;
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    }
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-64 md:w-96">
        <div className="flex justify-between items-end mb-2">
            <div className="flex items-center gap-2 text-indigo-500">
                <Cpu className="w-5 h-5 animate-spin-slow" />
                <span className="font-mono text-xs tracking-widest">{text}</span>
            </div>
            <span className="font-mono text-2xl font-bold text-white">{Math.floor(progress)}%</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
            <div 
                className="h-full bg-indigo-500 shadow-[0_0_15px_#6366f1]"
                style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
            ></div>
        </div>

        {/* Decorative Grid */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-32 bg-[linear-gradient(to_bottom,transparent,rgba(99,102,241,0.1))] mask-image-gradient"></div>
        
        {/* Verification Icon */}
        <div 
            className={`absolute -bottom-24 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${progress === 100 ? 'opacity-100' : 'opacity-0'}`}
        >
             <Fingerprint className="w-16 h-16 text-indigo-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;

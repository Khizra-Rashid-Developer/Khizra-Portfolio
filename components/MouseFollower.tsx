import React, { useEffect, useRef } from 'react';

const MouseFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const trailer = trailerRef.current;
    if (!cursor || !trailer) return;

    let cursorX = -100, cursorY = -100;
    let trailerX = -100, trailerY = -100;

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      cursor.style.opacity = '1';
      trailer.style.opacity = '1';
    };

    const animate = () => {
      // Linear interpolation for smooth trailing
      trailerX += (cursorX - trailerX) * 0.15;
      trailerY += (cursorY - trailerY) * 0.15;
      
      trailer.style.transform = `translate(${trailerX}px, ${trailerY}px)`;
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full pointer-events-none z-[100] mix-blend-difference -ml-1 -mt-1 opacity-0 transition-opacity duration-300 hidden md:block" 
      />
      <div 
        ref={trailerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-indigo-500/50 rounded-full pointer-events-none z-[99] -ml-4 -mt-4 opacity-0 transition-opacity duration-300 hidden md:block backdrop-blur-[1px]"
      />
    </>
  );
};

export default MouseFollower;

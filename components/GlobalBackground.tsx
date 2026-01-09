import React, { useEffect, useRef } from 'react';

const GlobalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Optimized Configuration for NO LAG
    const particleCount = 15; // Extremely lightweight
    const connectionDistance = 180; // Slightly larger to compensate for fewer dots
    
    // Check if light mode is active to set color
    const isLightMode = document.body.classList.contains('light-mode');
    let particleColor = isLightMode ? 'rgba(99, 102, 241, 0.5)' : 'rgba(148, 163, 184, 0.2)';
    let lineColor = isLightMode ? 'rgba(99, 102, 241, 0.15)' : 'rgba(148, 163, 184, 0.05)';

    // Observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isLight = document.body.classList.contains('light-mode');
                particleColor = isLight ? 'rgba(99, 102, 241, 0.5)' : 'rgba(148, 163, 184, 0.2)';
                lineColor = isLight ? 'rgba(99, 102, 241, 0.15)' : 'rgba(148, 163, 184, 0.05)';
            }
        });
    });
    observer.observe(document.body, { attributes: true });

    const particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Slower velocity
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          // Avoid expensive sqrt if possible, check squares first
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionDistance * connectionDistance) {
            const dist = Math.sqrt(distSq);
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - dist / connectionDistance;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    // Throttle resize event
    let resizeTimeout: number;
    const throttledResize = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 100);
    }
    
    window.addEventListener('resize', throttledResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', throttledResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-2]"
    />
  );
};

export default GlobalBackground;
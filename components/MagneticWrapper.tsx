import React, { useRef, useEffect } from 'react';

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How strong the pull is (default 0.3)
}

const MagneticWrapper: React.FC<MagneticWrapperProps> = ({ children, className = "", strength = 0.3 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let bounds = element.getBoundingClientRect();
    
    // Update bounds on scroll/resize to ensure accuracy without constant recalculation
    const updateBounds = () => {
        bounds = element.getBoundingClientRect();
    }
    
    // Passive listeners for better scroll performance
    window.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('resize', updateBounds, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // Calculate position relative to center using cached bounds
      const x = clientX - (bounds.left + bounds.width / 2);
      const y = clientY - (bounds.top + bounds.height / 2);
      
      // Direct DOM update - No React Render Cycle
      element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = `translate(0px, 0px)`;
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default MagneticWrapper;
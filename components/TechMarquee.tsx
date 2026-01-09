import React from 'react';
import { SKILLS } from '../constants';

const TechMarquee: React.FC = () => {
  // Duplicate skills for seamless loop
  const skillsRow1 = [...SKILLS, ...SKILLS];
  const skillsRow2 = [...SKILLS.reverse(), ...SKILLS.reverse()];

  return (
    <div className="w-full py-10 overflow-hidden relative bg-slate-950/50 backdrop-blur-sm border-y border-white/5">
      
      {/* Row 1: Forward */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee mb-4">
        {skillsRow1.map((skill, index) => (
          <div 
            key={`${skill.name}-1-${index}`} 
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 shadow-lg hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            <span className="font-mono font-bold text-sm tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Row 2: Reverse */}
      <div className="flex gap-8 whitespace-nowrap animate-marquee-reverse">
        {skillsRow2.map((skill, index) => (
          <div 
            key={`${skill.name}-2-${index}`} 
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 shadow-lg hover:border-purple-500 hover:text-purple-400 transition-colors cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="font-mono font-bold text-sm tracking-wide">{skill.name}</span>
          </div>
        ))}
      </div>

      {/* Fade Edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TechMarquee;

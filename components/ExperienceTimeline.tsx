import React from 'react';
import { INTERNSHIPS, EDUCATION } from '../constants';
import { Internship } from '../types';
import { BookOpen } from 'lucide-react';
import TiltCard from './TiltCard';
import InternshipCard from './InternshipCard';

interface TimelineProps {
    onItemClick: (internship: Internship) => void;
}

const ExperienceTimeline: React.FC<TimelineProps> = ({ onItemClick }) => {
  return (
    <div className="relative container mx-auto px-4 sm:px-6 max-w-5xl">
      {/* Central Line with Gradient */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent md:-translate-x-1/2 hidden md:block opacity-50"></div>
      
      <div className="space-y-16">
        {/* Header */}
        <div className="text-center mb-16 reveal">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-100 mb-4">My Journey</h2>
            <p className="text-slate-400">A timeline of my professional growth and educational milestones.</p>
        </div>

        {/* Internships Section */}
        {INTERNSHIPS.map((internship, index) => (
            <div key={`intern-${index}`} className={`relative flex flex-col md:flex-row gap-8 items-center reveal ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-slate-950 border-2 border-indigo-500 rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_20px_#6366f1] mt-8 hidden md:block">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-75"></div>
                </div>
                
                {/* Content - Using InternshipCard for Image Preview */}
                <div className="w-full md:w-1/2">
                   <InternshipCard 
                       internship={internship} 
                       onClick={() => onItemClick(internship)} 
                   />
                </div>
                
                {/* Date/Label side */}
                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                   <span className="text-5xl font-heading font-bold text-slate-800/30 select-none hidden md:block drop-shadow-sm">0{index + 1}</span>
                </div>
            </div>
        ))}

        {/* Education Section */}
        {EDUCATION.map((edu, index) => (
            <div key={`edu-${index}`} className={`relative flex flex-col md:flex-row gap-8 items-center reveal ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                 {/* Timeline Node */}
                 <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-slate-950 border-2 border-purple-500 rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_20px_#a855f7] mt-8 hidden md:block">
                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-75"></div>
                 </div>

                 <div className="w-full md:w-1/2">
                    <TiltCard className="glass-panel p-8 rounded-3xl transition-all group hover:border-purple-500/50">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3.5 bg-purple-500/10 rounded-2xl text-purple-500 border border-purple-500/20">
                                <BookOpen className="w-6 h-6" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-100 mb-1">{edu.degree}</h3>
                        <p className="text-purple-400 font-medium mb-2 text-lg">{edu.institution}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>
                    </TiltCard>
                </div>
                
                 <div className={`w-full md:w-1/2 flex ${index % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                   <span className="text-5xl font-heading font-bold text-slate-800/30 select-none hidden md:block drop-shadow-sm">ED</span>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;
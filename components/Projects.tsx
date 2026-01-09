import React, { useState } from 'react';
import { Terminal, Github, Code, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import TiltCard from './TiltCard';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Python' | 'AI/Data'>('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === (filter === 'AI/Data' ? 'AI/Data' : 'Python'));

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-16 text-center reveal">
        <div className="inline-block p-3 bg-slate-900/50 rounded-2xl border border-slate-800 mb-6 backdrop-blur-md shadow-xl">
            <Terminal className="w-8 h-8 text-indigo-400" />
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 mb-6 drop-shadow-sm">
          Featured Projects
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Practical applications of my coding journey, ranging from game logic to advanced AI models.
        </p>
        
        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mt-10 flex-wrap">
          {['All', 'Python', 'AI/Data'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category as any)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden group ${
                filter === category 
                  ? 'text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' 
                  : 'text-slate-400 hover:text-slate-50 glass-panel'
              }`}
            >
              {filter === category && (
                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div key={idx} className="reveal delay-100 h-full">
            <TiltCard className="h-full">
                <div className="glass-panel relative h-full overflow-hidden rounded-3xl transition-all duration-500 group border border-slate-800 hover:border-indigo-500/50">
                    
                    {/* Border Beam Effect */}
                    {!project.isComingSoon && (
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-full rounded-3xl overflow-hidden">
                                <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:animate-border-beam before:[offset-anchor:center] before:[offset-path:rect(0%_auto_100%_auto)] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            </div>
                        </div>
                    )}

                    <div className="relative z-10 p-8 flex flex-col h-full bg-slate-900/40 hover:bg-slate-900/60 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                        <div className={`p-3.5 rounded-2xl transition-all duration-300 ${
                            project.isComingSoon 
                                ? 'bg-slate-800/50 text-slate-400' 
                                : 'bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                        }`}>
                            {project.isComingSoon ? <Sparkles className="w-6 h-6 animate-pulse" /> : <Code className="w-6 h-6" />}
                        </div>
                        </div>
                        
                        <h3 className={`text-2xl font-bold mb-3 transition-colors ${
                            project.isComingSoon ? 'text-slate-500' : 'text-slate-100 group-hover:text-indigo-300'
                        }`}>
                        {project.title}
                        </h3>
                        
                        <p className="text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed">
                        {project.description}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-slate-800/50 flex flex-col gap-4">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                <span key={t} className={`text-xs font-mono font-medium px-2.5 py-1 rounded-md border ${
                                    project.isComingSoon 
                                        ? 'text-slate-500 bg-slate-900 border-slate-800'
                                        : 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20'
                                }`}>
                                    {t}
                                </span>
                                ))}
                            </div>
                            
                            {!project.isComingSoon ? (
                                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full p-3 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all group/btn mt-2 border border-slate-700 hover:border-indigo-500">
                                    <span className="text-sm font-semibold">View Source</span>
                                    <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                </a>
                            ) : (
                                <div className="flex items-center gap-2 text-sm text-slate-600 mt-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Coming Soon</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
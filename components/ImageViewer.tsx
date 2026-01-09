import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { X, ExternalLink, ShieldCheck, Briefcase, Award } from 'lucide-react';

export interface ViewerData {
  src: string;
  title: string;
  subtitle: string;
  type: 'Internship' | 'Certification';
  tags: string[];
  description?: string;
}

interface ImageViewerProps {
  data: ViewerData;
  onClose: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ data, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => { 
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-[100000] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in-up"
      onClick={onClose}
    >
        {/* Main Card Container */}
        <div 
            className="bg-slate-900 border border-slate-700 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-auto"
            onClick={(e) => e.stopPropagation()}
        >
            {/* Left Side: Image Display */}
            <div className="w-full md:w-3/5 bg-slate-950 relative group h-[40vh] md:h-auto min-h-[300px] flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-slate-800">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 opacity-50"></div>
                <div className="absolute inset-0 bg-grid opacity-20"></div>
                
                <img 
                    src={data.src} 
                    alt={data.title}
                    className="relative z-10 w-full h-full object-contain rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Floating Type Badge */}
                <div className="absolute top-4 left-4 z-20">
                     <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border ${
                         data.type === 'Internship' 
                         ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                         : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                     }`}>
                         {data.type === 'Internship' ? <Briefcase className="w-3.5 h-3.5" /> : <Award className="w-3.5 h-3.5" />}
                         {data.type}
                     </span>
                </div>
            </div>

            {/* Right Side: Details Panel */}
            <div className="w-full md:w-2/5 flex flex-col bg-slate-900">
                {/* Header / Actions */}
                <div className="flex justify-between items-center p-6 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-green-400">
                        <ShieldCheck className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-widest">Verified Credential</span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-100 mb-2 leading-tight">
                        {data.title}
                    </h2>
                    
                    <p className="text-lg text-indigo-400 font-medium mb-6">
                        {data.subtitle}
                    </p>

                    <div className="space-y-6">
                        {/* Tags Section */}
                        {data.tags.length > 0 && (
                            <div>
                                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">Skills & Domain</h4>
                                <div className="flex flex-wrap gap-2">
                                    {data.tags.map((tag, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-md text-slate-300 text-sm font-medium">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Description */}
                        <div>
                             <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">About this credential</h4>
                             <p className="text-slate-400 leading-relaxed text-sm">
                                {data.description || (
                                    data.type === 'Internship' 
                                    ? `Successfully completed a professional internship at ${data.subtitle}. Gained hands-on experience in ${data.tags.join(', ')} and contributed to real-world projects.`
                                    : `Achieved professional certification in ${data.title}. This credential validates proficiency in ${data.tags.join(', ')} and demonstrates a commitment to continuous learning.`
                                )}
                             </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                    <a 
                        href={data.src} 
                        download
                        className="flex items-center justify-center gap-2 w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Download / View Full
                    </a>
                </div>
            </div>
        </div>
    </div>,
    document.body
  );
};

export default ImageViewer;
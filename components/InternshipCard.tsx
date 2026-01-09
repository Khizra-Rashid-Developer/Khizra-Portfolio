import React, { useState } from 'react';
import { Internship } from '../types';
import { Briefcase, CheckCircle, FileText } from 'lucide-react';
import TiltCard from './TiltCard';

interface InternshipCardProps {
  internship: Internship;
  onClick: () => void;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div onClick={onClick} className="cursor-pointer h-full">
      <TiltCard className="group relative bg-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all duration-500 shadow-lg hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] h-full flex flex-col">
        {/* Decorative Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
        
        {/* Changed to Portrait Aspect Ratio [3/4] for letters */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-950">
           {!imgError ? (
            <img
              src={internship.imageFileName}
              alt={`${internship.company} Offer Letter`}
              className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  setImgError(true);
              }}
            />
          ) : (
               <div className="w-full h-full flex items-center justify-center bg-slate-800">
                 <Briefcase className="w-16 h-16 text-slate-600 group-hover:text-amber-500 transition-colors" />
               </div>
          )}
          
          {/* Overlay Badge */}
          <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-2 shadow-lg z-10">
              <CheckCircle className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span className="text-xs font-bold text-amber-100 uppercase tracking-wider">Verified</span>
          </div>
  
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
          
          {/* Content overlaid on bottom of image area */}
          <div className="absolute bottom-0 left-0 p-6 w-full z-20">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors drop-shadow-lg">
                  {internship.company}
              </h3>
              <div className="flex items-center gap-2 text-slate-300">
                 <FileText className="w-4 h-4 text-amber-500" />
                 <span className="font-medium text-sm">Offer Letter</span>
              </div>
          </div>
        </div>
  
        <div className="p-6 bg-slate-900 relative flex-1 border-t border-slate-800">
          <div className="space-y-3">
              <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Role</p>
                  <p className="text-slate-200 font-medium">{internship.role}</p>
              </div>
              <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Domain</p>
                  <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md text-xs text-amber-400 font-mono font-bold">
                      {internship.domain}
                  </div>
              </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

export default InternshipCard;
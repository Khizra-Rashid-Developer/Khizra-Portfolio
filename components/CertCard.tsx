import React, { useState } from 'react';
import { Certification } from '../types';
import { Award, Eye } from 'lucide-react';
import TiltCard from './TiltCard';

interface CertCardProps {
  cert: Certification;
  onClick: () => void;
}

const CertCard: React.FC<CertCardProps> = ({ cert, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const placeholderUrl = `https://picsum.photos/seed/${cert.title.replace(/\s/g, '')}/400/300`;

  return (
    <div onClick={onClick} className="cursor-pointer h-full">
      <TiltCard className="group relative bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500 transition-colors duration-300 shadow-xl hover:shadow-indigo-500/10 h-full flex flex-col">
        {/* Landscape Aspect Ratio */}
        <div className="aspect-[4/3] overflow-hidden bg-slate-900 relative">
          {!imgError ? (
            <img
              src={cert.imageFileName}
              alt={cert.title}
              className="w-full h-full object-cover object-top transition-opacity duration-300 opacity-90 group-hover:opacity-100"
              onError={(e) => {
                e.currentTarget.src = placeholderUrl;
              }}
            />
          ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-800">
                <Award className="w-16 h-16 text-slate-600 group-hover:text-indigo-500 transition-colors" />
              </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-slate-950/80 p-2 rounded-full text-indigo-400">
                <Eye className="w-6 h-6" />
              </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 pointer-events-none" />
          <div className="absolute bottom-0 left-0 p-4 pointer-events-none">
              <span className="inline-block px-2 py-1 bg-indigo-600/90 text-white text-xs rounded-md mb-2 backdrop-blur-sm shadow-sm">
                  {cert.issuer}
              </span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <h3 className="text-lg font-bold text-slate-100 leading-tight group-hover:text-indigo-400 transition-colors">
              {cert.title}
          </h3>
          <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700/50 flex items-center gap-1">
             <Award className="w-3 h-3" />
             Verified Certificate
          </p>
        </div>
      </TiltCard>
    </div>
  );
};

export default CertCard;
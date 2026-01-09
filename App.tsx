import React, { useEffect, useState, useRef } from 'react';
import { Cpu, Award } from 'lucide-react';
import { SKILLS, CERTIFICATIONS } from './constants';
import { Internship, Certification } from './types'; // Import types
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import SkillsChart from './components/SkillsChart';
import CertCard from './components/CertCard';
import ScrollToTop from './components/ScrollToTop';
import MouseFollower from './components/MouseFollower';
import ImageViewer, { ViewerData } from './components/ImageViewer';
import TechMarquee from './components/TechMarquee';
import ExperienceTimeline from './components/ExperienceTimeline';
import ThemeSwitcher from './components/ThemeSwitcher';
import BentoGrid from './components/BentoGrid';
import GlobalBackground from './components/GlobalBackground';

const SectionHeader: React.FC<{ title: string; subtitle: string; icon?: React.ReactNode }> = ({ title, subtitle, icon }) => (
  <div className="mb-16 text-center reveal">
    <div className="flex items-center justify-center gap-3 mb-4">
        <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-inner backdrop-blur-md">
            {icon}
        </div>
    </div>
    <h2 className="text-4xl md:text-5xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-indigo-200 to-indigo-400 mb-4 drop-shadow-[0_0_15px_rgba(99,102,241,0.3)]">
    {title}
    </h2>
    <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>
    <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto mt-6 rounded-full opacity-50"></div>
  </div>
);

// Highly Optimized Scroll Progress Bar (Direct DOM)
const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (barRef.current) {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            barRef.current.style.transform = `scaleX(${scroll})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent pointer-events-none">
      <div 
        ref={barRef}
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.7)] will-change-transform origin-left transform scale-x-0"
      />
    </div>
  )
}

const App: React.FC = () => {
  // State to hold the raw data item (Internship or Certification)
  const [selectedItem, setSelectedItem] = useState<{ type: 'Internship' | 'Certification', data: Internship | Certification } | null>(null);

  // Helper to transform raw data into ViewerData format
  const getViewerData = (): ViewerData | null => {
    if (!selectedItem) return null;

    if (selectedItem.type === 'Internship') {
        const item = selectedItem.data as Internship;
        return {
            src: item.imageFileName,
            title: item.company,
            subtitle: item.role,
            type: 'Internship',
            tags: [item.domain],
            description: `Completed a professional internship as a ${item.role} at ${item.company}. Gained comprehensive experience in ${item.domain}.`
        };
    } else {
        const item = selectedItem.data as Certification;
        return {
            src: item.imageFileName,
            title: item.title,
            subtitle: item.issuer,
            type: 'Certification',
            tags: [item.issuer], // Using issuer as a tag for certs
            description: `Professional certification issued by ${item.issuer}. Validates expertise in ${item.title}.`
        };
    }
  };

  const viewerData = getViewerData();

  // Performance Optimized Scroll Reveal using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% visible
      rootMargin: "0px 0px -50px 0px"
    });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen text-slate-200 selection:bg-indigo-500/30 font-sans animate-fade-in-up">
      
      <ScrollProgress />
      <GlobalBackground />
      <MouseFollower />
      <Navbar />
      <ThemeSwitcher />
      
      {/* For Hero Profile Pic, we can treat it as a generic item or ignore zoom. 
          Currently Hero uses onProfileClick but we can skip it or adapt it. 
          For now, keeping Hero simple. */}
      <Hero />
      
      {/* New Modern Feature: Bento Grid */}
      <div className="reveal">
        <BentoGrid />
      </div>
      
      {/* Infinite Marquee between Hero and Skills */}
      <TechMarquee />

      {/* Skills Section */}
      <section id="skills" className="py-24 relative content-visibility-auto">
          <div className="absolute top-1/2 left-0 w-1/3 h-full bg-indigo-600/5 blur-[120px] -translate-y-1/2 pointer-events-none will-change-transform"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <SectionHeader title="Technical Arsenal" subtitle="Tools and technologies I use to bring ideas to life." icon={<Cpu className="w-8 h-8 text-indigo-400"/>} />
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="reveal order-2 lg:order-1">
                      <SkillsChart />
                  </div>
                  <div className="reveal space-y-8 order-1 lg:order-2">
                      <div className="bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 hover:border-indigo-500/30 transition-all shadow-xl">
                          <h3 className="text-2xl font-heading font-bold text-slate-200 mb-4">Core Competencies</h3>
                          <p className="text-slate-400 leading-relaxed mb-6">
                              I specialize in Python-driven data analysis and AI model development. 
                              My toolkit includes industry-standard libraries like Pandas, TensorFlow, and comprehensive data visualization tools.
                          </p>
                          <div className="flex flex-wrap gap-2">
                              {SKILLS.slice(0, 8).map(skill => (
                                  <span key={skill.name} className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-full text-xs font-mono text-indigo-300">
                                      {skill.name}
                                  </span>
                              ))}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Unified Journey Section (Internships + Education) */}
      <section id="experience-section" className="py-24 relative overflow-hidden bg-slate-900/20 content-visibility-auto">
          <div className="max-w-7xl mx-auto relative z-10">
              <ExperienceTimeline 
                onItemClick={(internship) => setSelectedItem({ type: 'Internship', data: internship })} 
              />
          </div>
      </section>

      <Projects />

      {/* Certifications Section */}
      <section id="certifications" className="py-24 relative content-visibility-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <SectionHeader title="Certifications" subtitle="Credentials and verified skills." icon={<Award className="w-8 h-8 text-indigo-400"/>} />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal">
                  {CERTIFICATIONS.map((cert, idx) => (
                      <CertCard 
                      key={idx} 
                      cert={cert} 
                      onClick={() => setSelectedItem({ type: 'Certification', data: cert })}
                      />
                  ))}
              </div>
          </div>
      </section>

      <Contact />
      <ScrollToTop />
      
      {/* New Detailed Viewer */}
      {viewerData && (
        <ImageViewer 
          data={viewerData}
          onClose={() => setSelectedItem(null)} 
        />
      )}
      
    </div>
  );
};

export default App;
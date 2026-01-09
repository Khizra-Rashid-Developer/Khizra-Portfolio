import React, { useState, useRef, useEffect } from 'react';
import { Mail, Github, Send, MessageSquare, ChevronRight, User, AtSign, Phone, Sparkles, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import MagneticWrapper from './MagneticWrapper';

const Contact: React.FC = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const questions = [
    { key: 'name', label: "What's your name?", icon: <User className="w-6 h-6 text-indigo-400" />, placeholder: "John Doe" },
    { key: 'email', label: "What's your email?", icon: <AtSign className="w-6 h-6 text-purple-400" />, placeholder: "john@example.com", type: 'email' },
    { key: 'message', label: "How can I help you?", icon: <MessageSquare className="w-6 h-6 text-pink-400" />, placeholder: "I have a project idea...", type: 'textarea' }
  ];

  // Only focus when moving to next step, NOT on initial render to prevent scroll jank
  useEffect(() => {
    if (step > 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step]);

  const handleNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    const currentKey = questions[step].key as keyof typeof formData;
    
    if (!formData[currentKey]) return; // Basic validation

    if (step < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      handleWhatsAppRedirect();
    }
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "923133258330"; 
    const text = `*Name:* ${formData.name}%0a*Email:* ${formData.email}%0a*Message:* ${formData.message}`;
    const url = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(url, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [questions[step].key]: e.target.value });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleNext();
    }
  };

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  return (
    <footer id="contact" className="py-24 border-t border-slate-700 bg-slate-950/80 relative overflow-hidden">
      {/* Performance Optimized Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] will-change-transform"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] will-change-transform"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Side: Info */}
          <div className="reveal space-y-8">
            <div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-100 mb-6 leading-tight">
                    Get in <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Touch</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Interested in working together? Fill out the form to chat directly on WhatsApp, or connect via other platforms below.
                </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-indigo-500/40 hover:bg-slate-800 transition-all group w-max">
                  <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Email Me</span>
                    <p className="text-slate-200 group-hover:text-white">{PERSONAL_INFO.email}</p>
                  </div>
              </a>
              
               <div className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-green-500/40 cursor-default w-max">
                  <div className="p-3 bg-green-500/10 rounded-full text-green-400">
                     <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Call Me</span>
                    <p className="text-slate-200">0313-3258330</p>
                  </div>
              </div>
              
              <div className="flex gap-4">
                 <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-purple-500/40 hover:bg-slate-800 transition-all group w-max flex-1">
                    <div className="p-3 bg-purple-500/10 rounded-full text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">GitHub</span>
                      <p className="text-slate-200 group-hover:text-white text-sm">View Code</p>
                    </div>
                </a>

                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-blue-500/40 hover:bg-slate-800 transition-all group w-max flex-1">
                    <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">LinkedIn</span>
                      <p className="text-slate-200 group-hover:text-white text-sm">Connect</p>
                    </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Conversational Form */}
          <div className="relative perspective-1000">
             {/* Glass Card */}
            <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] reveal delay-100 min-h-[450px] flex flex-col relative overflow-hidden group hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500">
                
                {/* Header for WhatsApp System */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-800/50">
                    <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div>
                         <h3 className="text-xl font-heading font-bold text-slate-100 tracking-wide">Contact Me</h3>
                         <p className="text-xs text-slate-400">Powered by WhatsApp</p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
                    <div 
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out shadow-[0_0_10px_#818cf8]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Step Indicator */}
                <div className="mb-2 flex justify-between items-center text-xs font-mono text-slate-500 uppercase tracking-widest">
                    <span>Step {step + 1}/3</span>
                    <span className="text-indigo-400 font-bold">{Math.round(progress)}% Complete</span>
                </div>

                {/* Question Area */}
                <div className={`flex-1 flex flex-col justify-center transition-all duration-500 ease-in-out transform ${isAnimating ? 'opacity-0 translate-x-10 scale-95' : 'opacity-100 translate-x-0 scale-100'}`}>
                    <label className="block text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-8 flex items-center gap-3">
                        {currentQ.label}
                    </label>
                    
                    <div className="relative group/input">
                        {currentQ.type === 'textarea' ? (
                            <textarea
                                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                                value={formData[currentQ.key as keyof typeof formData]}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder={currentQ.placeholder}
                                className="w-full bg-slate-800/50 border-b-2 border-slate-700 text-xl md:text-2xl text-slate-100 py-4 px-2 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500 resize-none h-32 rounded-t-lg"
                                required
                            />
                        ) : (
                            <input
                                ref={inputRef as React.RefObject<HTMLInputElement>}
                                type={currentQ.type || 'text'}
                                value={formData[currentQ.key as keyof typeof formData]}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                placeholder={currentQ.placeholder}
                                className="w-full bg-slate-800/50 border-b-2 border-slate-700 text-xl md:text-2xl text-slate-100 py-4 px-2 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-500 rounded-t-lg"
                                required
                            />
                        )}
                        {/* Animated Bottom Border */}
                        <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ${focused ? 'w-full' : 'w-0'}`}></div>
                        
                        {/* Icon inside input */}
                        <div className="absolute right-2 top-4 opacity-50">
                            {currentQ.icon}
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="mt-8 flex justify-end">
                    <MagneticWrapper>
                        <button 
                            onClick={handleNext}
                            className={`ripple-btn relative overflow-hidden group flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl ${
                            step === questions.length - 1 
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white shadow-green-500/20' 
                            : 'bg-white text-slate-950 hover:bg-indigo-50 shadow-indigo-500/20'
                            }`}
                        >
                            <span className="relative z-10">{step === questions.length - 1 ? 'Send via WhatsApp' : 'Next Step'}</span>
                            {step === questions.length - 1 ? <Send className="w-5 h-5 relative z-10" /> : <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />}
                            
                            {/* Button Glow Effect */}
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </button>
                    </MagneticWrapper>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Khizra Rashid. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500 font-medium">
                <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
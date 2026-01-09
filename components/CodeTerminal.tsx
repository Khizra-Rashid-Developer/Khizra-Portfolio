import React, { useState, useEffect } from 'react';
import { Terminal, Play } from 'lucide-react';

const CodeTerminal: React.FC = () => {
  const [text, setText] = useState('');
  const fullCode = `class Developer:
  def __init__(self):
    self.name = "Khizra Rashid"
    self.role = "Python Dev"
    self.passion = "AI & Data"

  def build_future(self):
    while True:
      self.learn()
      self.code()
      self.innovate()

me = Developer()
me.build_future()`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullCode.substring(0, i));
      i++;
      if (i > fullCode.length) {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Simple syntax highlighting via regex splitting (visual only)
  const renderCode = () => {
    return (
      <code className="font-mono text-sm leading-relaxed">
        {text.split('\n').map((line, idx) => (
          <div key={idx} className="table-row">
            <span className="table-cell text-slate-700 select-none text-right pr-4 w-8">{idx + 1}</span>
            <span className="table-cell whitespace-pre-wrap text-slate-300">
               {/* Basic highlighting logic */}
               {line.split(' ').map((word, wIdx) => {
                  let color = 'text-slate-300';
                  if (['class', 'def', 'while', 'True', 'return'].includes(word)) color = 'text-purple-400';
                  if (['self', 'me'].includes(word.replace(/[.:()]/g, ''))) color = 'text-indigo-400';
                  if (word.includes('"')) color = 'text-green-400';
                  if (word.includes('__init__') || word.includes('build_future')) color = 'text-yellow-300';
                  
                  return <span key={wIdx} className={color}>{word} </span>;
               })}
            </span>
          </div>
        ))}
        <span className="animate-pulse text-indigo-500">_</span>
      </code>
    );
  };

  return (
    <div className="w-full h-full glass-panel rounded-3xl overflow-hidden flex flex-col border border-slate-700/50 shadow-2xl group hover:border-indigo-500/30 transition-all">
      {/* Window Header */}
      <div className="bg-slate-900/80 px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <Terminal className="w-3 h-3" />
            <span>portfolio.py</span>
        </div>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      {/* Code Area */}
      <div className="flex-1 bg-slate-950/50 p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
        {renderCode()}
      </div>

      {/* Status Bar */}
      <div className="bg-slate-900/80 px-4 py-1.5 flex justify-between items-center text-[10px] text-slate-500 font-mono border-t border-slate-800">
          <div className="flex gap-3">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-indigo-500"></div> Python 3.10</span>
              <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-1 text-indigo-400">
             <Play className="w-3 h-3" /> Running...
          </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
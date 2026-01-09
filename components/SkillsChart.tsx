import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { SKILLS } from '../constants';

const SkillsChart: React.FC = () => {
  // Filter for top technical skills to display in chart
  const chartData = SKILLS.filter(s => s.category === 'Technical' || s.category === 'Tools')
    .sort((a, b) => b.level - a.level)
    .slice(0, 8); // Top 8 skills

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-4 rounded-xl shadow-2xl">
          <p className="font-heading font-bold text-slate-100 mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            <p className="text-indigo-300 font-mono text-sm">Proficiency: {payload[0].value}%</p>
          </div>
          {payload[0].payload.status && (
            <p className="text-xs text-slate-500 mt-2 pt-2 border-t border-slate-800">Status: <span className="text-amber-500">{payload[0].payload.status}</span></p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[450px] bg-slate-900/40 backdrop-blur-md rounded-3xl p-6 border border-slate-800/50 shadow-xl relative overflow-hidden group">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none"></div>
      
      <div className="flex justify-between items-center mb-6 relative z-10">
          <h3 className="text-xl font-heading font-bold text-slate-200">Proficiency Levels</h3>
          <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
          </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.3} />
          <XAxis type="number" domain={[0, 100]} hide />
          <YAxis
            dataKey="name"
            type="category"
            width={130}
            tick={{ fill: '#94a3b8', fontSize: 13, fontFamily: 'Inter', fontWeight: 500 }}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99, 102, 241, 0.05)', radius: 8 }} />
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0.8}/>
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>
          <Bar dataKey="level" radius={[0, 6, 6, 0]} barSize={24} animationDuration={1500}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill="url(#barGradient)" strokeWidth={0} filter="url(#glow)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;

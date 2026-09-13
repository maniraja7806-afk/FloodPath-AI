import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAppContext } from '../context/AppContext';

export default function CommandCenter() {
  const { disasterLevel, incidents } = useAppContext();

  const data = [
    { time: '08:00', level: 1.2, risk: 10 },
    { time: '09:00', level: 2.1, risk: 20 },
    { time: '10:00', level: 5.4, risk: 45 },
    { time: '11:00', level: 15.4, risk: 75 },
    { time: '12:00', level: 22.1, risk: 85 },
    { time: '13:00', level: disasterLevel > 0 ? 45.8 : 12.1, risk: disasterLevel > 0 ? 95 : 40 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-8 border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Disaster Command Center</h1>
        <p className="text-slate-400">High-level analytics and predictive risk modelling for DMOs.</p>
      </header>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Total Active Incidents</p>
          <p className="text-3xl font-bold text-white">{incidents.length}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">High-Risk Zones</p>
          <p className="text-3xl font-bold text-rose-400">{disasterLevel > 0 ? 3 : 1}</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Available Shelter Cap</p>
          <p className="text-3xl font-bold text-emerald-400">292</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">AI Prediction (Next 3h)</p>
          <p className="text-3xl font-bold text-amber-400">{disasterLevel > 0 ? 'CRITICAL' : 'MODERATE'}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Rainfall vs Flood Risk Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                />
                <Line type="monotone" dataKey="level" stroke="#06b6d4" strokeWidth={3} name="Rainfall (mm)" />
                <Line type="monotone" dataKey="risk" stroke="#f43f5e" strokeWidth={3} name="Risk Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">AI Predictive Insights</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <h4 className="font-bold text-rose-400 mb-1">Immediate Danger: Sector 4 Underpass</h4>
              <p className="text-sm text-slate-300">Water levels expected to exceed 1.2m in the next 45 minutes based on upstream sensor data. Recommend immediate road closure.</p>
            </div>
            
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <h4 className="font-bold text-amber-400 mb-1">Resource Shift Recommended</h4>
              <p className="text-sm text-slate-300">Shelter B is nearing capacity. AI suggests routing new evacuees to North Govt School Shelter (2.5km away).</p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <h4 className="font-bold text-cyan-400 mb-1">Weather Forecast Change</h4>
              <p className="text-sm text-slate-300">Precipitation expected to reduce by 40% after 14:00. Drainage systems operating at 85% capacity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

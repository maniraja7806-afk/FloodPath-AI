import React from 'react';
import { ShieldAlert, Users, Clock, MapPin, CheckCircle, Navigation } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../utils';

export default function ResponderDashboard() {
  const { incidents } = useAppContext();
  
  // Sort incidents by severity for responder
  const priorityIncidents = [...incidents].sort((a, b) => {
    const scores = { HIGH: 3, MEDIUM: 2, LOW: 1, CRITICAL: 4 };
    return scores[b.severity] - scores[a.severity];
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Responder Dashboard</h1>
          <p className="text-slate-400">Emergency response priority queue and active incidents.</p>
        </div>
        <div className="bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl text-right">
          <p className="text-xs text-rose-400 font-bold uppercase tracking-wider">Active Responders</p>
          <p className="text-2xl font-bold text-white">12 Teams</p>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {priorityIncidents.map((inc, i) => (
          <div key={inc.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <span className={cn(
                "px-2.5 py-1 rounded-md text-xs font-bold tracking-wider",
                inc.severity === 'HIGH' || inc.severity === 'CRITICAL' ? 'bg-rose-500 text-white' : 
                'bg-amber-500 text-white'
              )}>
                P{inc.severity === 'HIGH' || inc.severity === 'CRITICAL' ? '1' : '2'} Priority
              </span>
              <span className="text-sm font-medium text-slate-400">{inc.confidenceScore}/100 AI Score</span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{inc.category}</h3>
            <p className="text-sm text-slate-400 mb-4 flex-1">{inc.description}</p>
            
            <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800 mb-6 text-sm flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1"><MapPin size={14}/> Distance</span>
                <span className="text-slate-300 font-medium">{(1.5 + i * 0.8).toFixed(1)} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 flex items-center gap-1"><Clock size={14}/> Reported</span>
                <span className="text-slate-300 font-medium">{new Date(inc.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Navigation size={18} /> Route
              </button>
              <button className="px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 flex items-center justify-center">
                <CheckCircle size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

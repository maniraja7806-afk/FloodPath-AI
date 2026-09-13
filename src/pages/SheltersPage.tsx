import React from 'react';
import { Home, Phone, Navigation, Users, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../utils';

export default function SheltersPage() {
  const { shelters } = useAppContext();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Emergency Shelters</h1>
        <p className="text-slate-400">Find nearest safe zones and relief centers with available capacity.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {shelters.map((shelter) => {
          const available = shelter.capacity - shelter.occupancy;
          const isFull = available <= 0;
          const occupancyPercent = (shelter.occupancy / shelter.capacity) * 100;
          
          return (
            <div key={shelter.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{shelter.name}</h3>
                  <p className="text-sm text-slate-400 flex items-center gap-1">
                    <Navigation size={14} className="text-cyan-500" /> {shelter.distance} km away
                  </p>
                </div>
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
                  isFull ? "bg-rose-500/10 text-rose-400 border-rose-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                )}>
                  {isFull ? 'FULL' : 'AVAILABLE'}
                </div>
              </div>

              <div className="bg-slate-950/50 rounded-lg p-4 mb-4 border border-slate-800/50">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Capacity Status</span>
                  <span className="font-medium text-slate-200">{shelter.occupancy} / {shelter.capacity}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className={cn("h-full rounded-full transition-all", occupancyPercent > 90 ? 'bg-rose-500' : occupancyPercent > 70 ? 'bg-amber-500' : 'bg-emerald-500')}
                    style={{ width: `${occupancyPercent}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">{available} spots remaining</p>
              </div>

              <div className="mb-6 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Facilities</p>
                <div className="flex flex-wrap gap-2">
                  {shelter.facilities.map(f => (
                    <span key={f} className="inline-flex items-center gap-1 text-xs text-slate-300 bg-slate-800/50 border border-slate-700 px-2.5 py-1 rounded-md">
                      <CheckCircle2 size={12} className="text-cyan-500" /> {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Navigation size={18} /> Navigate
                </button>
                <button className="px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 flex items-center justify-center">
                  <Phone size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

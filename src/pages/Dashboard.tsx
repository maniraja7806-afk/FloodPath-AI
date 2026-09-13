import React from 'react';
import { useAppContext } from '../context/AppContext';
import { CloudRain, AlertTriangle, ShieldAlert, Navigation, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../utils';

export default function Dashboard() {
  const { disasterLevel, incidents, shelters } = useAppContext();
  
  const riskLevels = [
    { label: 'LOW', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/20' },
    { label: 'MODERATE', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/20' },
    { label: 'HIGH RISK', color: 'text-rose-400', bg: 'bg-rose-400/10', border: 'border-rose-400/20' },
  ];
  
  const currentRisk = riskLevels[disasterLevel];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 relative z-10">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">Citizen Dashboard</h1>
          <p className="text-slate-400 flex items-center gap-2">
            <Activity size={16} className="text-cyan-400" />
            Live monitoring for New Delhi sector.
          </p>
        </div>
        
        <div className={cn("px-4 py-2 rounded-xl border flex items-center gap-3", currentRisk.bg, currentRisk.border)}>
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">City Risk Level</p>
            <p className={cn("text-lg font-bold", currentRisk.color)}>{currentRisk.label}</p>
          </div>
          <AlertTriangle className={currentRisk.color} size={28} />
        </div>
      </header>

      {/* Primary Action */}
      <section>
        <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/20 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              AI Navigation Active
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Find a Safe Route Now</h2>
            <p className="text-cyan-100/70 mb-8 leading-relaxed">
              Normal maps show the shortest path. We show the safest path considering live rainfall, waterlogging, and predictive flood models.
            </p>
            <Link to="/routes" className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-3 rounded-lg transition-colors shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <Navigation size={20} />
              Calculate Safe Route
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Rainfall Intensity', value: disasterLevel === 0 ? '1.2 mm/h' : disasterLevel === 1 ? '15.4 mm/h' : '45.8 mm/h', icon: CloudRain, color: 'text-blue-400' },
          { label: 'Active Alerts', value: incidents.length.toString(), icon: AlertTriangle, color: 'text-amber-400' },
          { label: 'Affected Roads', value: disasterLevel === 0 ? '2' : disasterLevel === 1 ? '14' : '38', icon: ShieldAlert, color: 'text-rose-400' },
          { label: 'Available Shelters', value: shelters.length.toString(), icon: Home, color: 'text-emerald-400' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl backdrop-blur-sm"
          >
            <stat.icon size={24} className={cn("mb-3", stat.color)} />
            <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Recent Incidents */}
      <section>
        <h3 className="text-lg font-bold text-white mb-4">Live Incident Feed</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {incidents.slice(0, 4).map((inc, i) => (
            <div key={inc.id} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex gap-4 items-start">
              <div className={cn(
                "p-2 rounded-lg shrink-0 mt-1",
                inc.severity === 'HIGH' ? "bg-rose-500/20 text-rose-400" :
                inc.severity === 'MEDIUM' ? "bg-amber-500/20 text-amber-400" :
                "bg-cyan-500/20 text-cyan-400"
              )}>
                <AlertTriangle size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-slate-200">{inc.category}</h4>
                  {inc.verified && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider border border-emerald-500/20">Verified</span>}
                </div>
                <p className="text-sm text-slate-400 mb-2 leading-relaxed">{inc.description}</p>
                <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                  <span>Score: {inc.confidenceScore}/100</span>
                  <span>•</span>
                  <span>{new Date(inc.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

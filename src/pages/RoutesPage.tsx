import React, { useState } from 'react';
import { Navigation, AlertTriangle, ShieldCheck, MapPin, Loader2, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

export default function RoutesPage() {
  const { disasterLevel, isDemoMode } = useAppContext();
  const [from, setFrom] = useState('Current Location (New Delhi)');
  const [to, setTo] = useState('Central Hospital');
  const [loading, setLoading] = useState(false);
  const [routes, setRoutes] = useState<any[]>([]);
  const [simulatedRain, setSimulatedRain] = useState(0); // For 'What if'

  const handleCalculate = () => {
    setLoading(true);
    setRoutes([]);
    
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      
      const effectiveDisasterLevel = isDemoMode ? disasterLevel + (simulatedRain > 0 ? 1 : 0) : disasterLevel;
      
      setRoutes([
        {
          id: 'r1',
          type: 'Safest',
          distance: 4.2,
          eta: effectiveDisasterLevel > 1 ? 35 : 24,
          riskLevel: effectiveDisasterLevel > 1 ? 'CAUTION' : 'SAFE',
          riskScore: effectiveDisasterLevel > 1 ? 45 : 12,
          reason: effectiveDisasterLevel > 1 
            ? 'Avoids main flooded zones, but requires caution due to recent rain.'
            : 'Elevated highway bypasses all known waterlogging zones.',
          color: effectiveDisasterLevel > 1 ? 'text-amber-400' : 'text-emerald-400',
          bg: effectiveDisasterLevel > 1 ? 'bg-amber-400/10' : 'bg-emerald-400/10',
          border: effectiveDisasterLevel > 1 ? 'border-amber-400/20' : 'border-emerald-400/20'
        },
        {
          id: 'r2',
          type: 'Balanced',
          distance: 3.5,
          eta: 20,
          riskLevel: effectiveDisasterLevel > 0 ? 'HIGH RISK' : 'CAUTION',
          riskScore: effectiveDisasterLevel > 0 ? 78 : 35,
          reason: effectiveDisasterLevel > 0
            ? 'Route now crosses 2 active flood zones. NOT RECOMMENDED.'
            : 'Slight risk of waterlogging on Sector 4 intersection.',
          color: effectiveDisasterLevel > 0 ? 'text-rose-400' : 'text-amber-400',
          bg: effectiveDisasterLevel > 0 ? 'bg-rose-400/10' : 'bg-amber-400/10',
          border: effectiveDisasterLevel > 0 ? 'border-rose-400/20' : 'border-amber-400/20'
        },
        {
          id: 'r3',
          type: 'Fastest',
          distance: 2.8,
          eta: 15,
          riskLevel: 'HIGH RISK',
          riskScore: 92,
          reason: 'Shortest path, but passes through severe flooded area with 0.6m water depth.',
          color: 'text-rose-400',
          bg: 'bg-rose-400/10',
          border: 'border-rose-400/20'
        }
      ]);
    }, 1500);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Safe Route Planner</h1>
        <p className="text-slate-400">Find the safest path considering live disaster intelligence.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-cyan-500" size={18} />
                  <input 
                    type="text" 
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-emerald-500" size={18} />
                  <input 
                    type="text" 
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <button 
                onClick={handleCalculate}
                disabled={loading}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Navigation size={20} />}
                {loading ? 'Analyzing AI Risk Models...' : 'Calculate Safe Routes'}
              </button>
            </div>
          </div>

          {/* What If Simulation */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">?</span>
              "What If?" Prediction
            </h3>
            <p className="text-sm text-slate-400 mb-4">Simulate future conditions to see how routes change.</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => { setSimulatedRain(30); handleCalculate(); }}
                className={cn("w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between", simulatedRain === 30 ? "bg-indigo-500/20 border-indigo-500 text-indigo-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700")}
              >
                <span className="font-medium text-sm">What if rainfall increases +30%?</span>
                <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => { setSimulatedRain(0); handleCalculate(); }}
                className={cn("w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between", simulatedRain === 0 ? "bg-indigo-500/20 border-indigo-500 text-indigo-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700")}
              >
                <span className="font-medium text-sm">Current Conditions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {!loading && routes.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-64 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl text-slate-500">
                <Navigation size={48} className="mb-4 opacity-20" />
                <p>Enter destination to calculate routes.</p>
              </motion.div>
            )}

            {!loading && routes.map((route, i) => (
              <motion.div 
                key={route.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn("border rounded-2xl p-6 transition-all", route.bg, route.border, "hover:bg-slate-800/50")}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">Route {String.fromCharCode(65 + i)} — {route.type}</h3>
                      <span className={cn("px-2.5 py-0.5 rounded text-xs font-bold tracking-wider uppercase border", route.color, route.bg, route.border)}>
                        {route.riskLevel}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                      <span><strong>ETA:</strong> {route.eta} min</span>
                      <span><strong>Dist:</strong> {route.distance} km</span>
                      <span><strong>Risk Score:</strong> {route.riskScore}/100</span>
                    </div>

                    <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-800/50">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 shrink-0">
                          {route.riskScore < 30 ? <ShieldCheck className="text-emerald-400" size={18} /> : <AlertTriangle className="text-rose-400" size={18} />}
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">AI Safety Analysis</p>
                          <p className="text-sm text-slate-300 leading-relaxed">{route.reason}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className={cn(
                    "px-6 py-3 rounded-xl font-bold transition-colors w-full md:w-auto shrink-0 border",
                    route.riskScore < 50 
                      ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400 border-transparent shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                      : "bg-transparent text-slate-400 border-slate-700 hover:text-white hover:border-slate-500"
                  )}>
                    {route.riskScore < 50 ? 'Start Navigation' : 'Select Anyway'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

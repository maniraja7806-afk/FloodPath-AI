import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation, Map, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-950 to-slate-950"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      
      <header className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
            <Navigation className="text-cyan-400" size={22} />
          </div>
          <span className="font-bold text-xl tracking-tight">FloodPath<span className="text-cyan-400">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider hidden md:block">
            SIH Prototype
          </span>
          <Link to="/dashboard" className="text-sm font-medium hover:text-cyan-400 transition-colors">
            Login
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-12 md:mt-0">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-semibold uppercase tracking-widest mb-4">
            AI-Powered Disaster Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-display leading-[1.1]">
            Don't just find a route. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Find a safe route.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Real-time AI decision-support combining weather, geospatial models, crowdsourced reports, and emergency resources to keep communities safe during floods and cyclones.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/routes" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] flex items-center justify-center gap-2">
              <Navigation size={24} />
              Find Safe Route
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white font-bold text-lg transition-all flex items-center justify-center gap-2">
              <Map size={24} />
              View Demo Dashboard
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="mt-24 grid md:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-sm">
            <ShieldCheck className="text-emerald-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">AI Risk Prediction</h3>
            <p className="text-slate-400 text-sm">Simulates future flood conditions and recommends safe alternatives instantly.</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-sm">
            <Map className="text-cyan-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Live Disaster Map</h3>
            <p className="text-slate-400 text-sm">Interactive GIS integration showing hazards, shelters, and emergency responders.</p>
          </div>
          <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-sm">
            <AlertTriangle className="text-amber-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Incident Verification</h3>
            <p className="text-slate-400 text-sm">Uses AI computer vision to analyze and classify crowdsourced disaster photos.</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

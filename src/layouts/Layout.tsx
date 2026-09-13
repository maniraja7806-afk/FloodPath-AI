import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Map as MapIcon, Navigation, AlertTriangle, Shield, User, Menu, X, PlusCircle } from 'lucide-react';
import { cn } from '../utils';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const location = useLocation();
  const { isDemoMode, simulateDisaster } = useAppContext();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Live Map', path: '/map', icon: MapIcon },
    { name: 'Safe Routes', path: '/routes', icon: Navigation },
    { name: 'Report Incident', path: '/incidents', icon: PlusCircle },
    { name: 'Shelters', path: '/shelters', icon: Shield },
    { name: 'Responder', path: '/responder', icon: AlertTriangle },
    { name: 'Command Center', path: '/command-center', icon: User },
  ];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={onClick}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium text-sm",
            location.pathname === item.path
              ? "bg-cyan-900/40 text-cyan-400 border border-cyan-800/50"
              : "text-slate-400 hover:text-white hover:bg-slate-800/50"
          )}
        >
          <item.icon size={20} />
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-40 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
            <Navigation className="text-cyan-400" size={18} />
          </div>
          <span className="font-bold text-lg tracking-tight">FloodPath<span className="text-cyan-400">AI</span></span>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 -mr-2">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="w-64 h-full bg-slate-900 border-r border-slate-800 p-4 flex flex-col shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl">Menu</span>
                <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
              </div>
              <div className="flex flex-col gap-2">
                <NavLinks onClick={() => setIsSidebarOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r border-slate-800/60 bg-slate-950/50 backdrop-blur-xl shrink-0 p-4 relative z-10">
        <div className="flex items-center gap-3 mb-10 mt-2 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Navigation className="text-cyan-400" size={22} />
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight leading-none">FloodPath<span className="text-cyan-400">AI</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Disaster Intel</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5 flex-1">
          <NavLinks />
        </div>

        {isDemoMode && (
          <div className="mt-auto pt-6 border-t border-slate-800/60 flex flex-col gap-3">
            <button className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all">
              <AlertTriangle size={20} />
              SOS EMERGENCY
            </button>
            <div className="bg-amber-950/30 border border-amber-900/50 rounded-lg p-3 text-center">
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-2 block">Demo Mode Active</span>
              <button 
                onClick={simulateDisaster}
                className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded text-xs font-medium transition-colors border border-amber-500/30"
              >
                Simulate Rainfall
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 flex flex-col">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="flex-1 relative z-10 flex flex-col">
          <Outlet />
        </div>
      </div>

      {/* Mobile Bottom Nav (Optional, maybe keep it simple with just sidebar) */}
    </div>
  );
}

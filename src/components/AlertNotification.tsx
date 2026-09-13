import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Info, X, CloudRain, ShieldAlert } from 'lucide-react';
import { cn } from '../utils';

export type AlertType = 'critical' | 'warning' | 'info';

export interface AlertNotificationProps {
  id: string;
  title: string;
  message: string;
  type?: AlertType;
  duration?: number;
  onDismiss: (id: string) => void;
}

export function AlertNotification({ 
  id, 
  title, 
  message, 
  type = 'info', 
  duration = 5000, 
  onDismiss 
}: AlertNotificationProps) {
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onDismiss(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onDismiss]);

  const config = {
    critical: {
      icon: ShieldAlert,
      bg: 'bg-rose-950/90',
      border: 'border-rose-500/50',
      iconColor: 'text-rose-400',
      titleColor: 'text-rose-100',
      shadow: 'shadow-[0_4px_20px_rgba(244,63,94,0.2)]'
    },
    warning: {
      icon: AlertTriangle,
      bg: 'bg-amber-950/90',
      border: 'border-amber-500/50',
      iconColor: 'text-amber-400',
      titleColor: 'text-amber-100',
      shadow: 'shadow-[0_4px_20px_rgba(245,158,11,0.2)]'
    },
    info: {
      icon: Info,
      bg: 'bg-cyan-950/90',
      border: 'border-cyan-500/50',
      iconColor: 'text-cyan-400',
      titleColor: 'text-cyan-100',
      shadow: 'shadow-[0_4px_20px_rgba(34,211,238,0.2)]'
    }
  };

  const style = config[type];
  const Icon = style.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={cn(
        "pointer-events-auto w-full sm:w-96 rounded-xl border p-4 backdrop-blur-md flex items-start gap-3",
        style.bg,
        style.border,
        style.shadow
      )}
    >
      <div className={cn("mt-0.5 shrink-0", style.iconColor)}>
        <Icon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={cn("text-sm font-bold mb-1 truncate", style.titleColor)}>{title}</h4>
        <p className="text-sm text-slate-300 leading-relaxed break-words">{message}</p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        aria-label="Dismiss alert"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}

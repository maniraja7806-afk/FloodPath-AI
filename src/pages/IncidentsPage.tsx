import React, { useState } from 'react';
import { Camera, AlertTriangle, Upload, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../utils';
import { motion } from 'motion/react';

export default function IncidentsPage() {
  const { addIncident, userLocation } = useAppContext();
  const [step, setStep] = useState(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  
  const handleUpload = () => {
    setStep(2);
    setAnalyzing(true);
    
    // Simulate AI Image Analysis
    setTimeout(() => {
      setAnalyzing(false);
      setAiResult({
        classification: 'Severe Waterlogging Detected',
        confidence: 94,
        severity: 'HIGH',
        category: 'Flooded Road',
        estimatedDepth: '0.4m - 0.6m',
        action: 'Road impassable for standard vehicles. Immediate closure recommended.'
      });
      setStep(3);
    }, 2500);
  };

  const handleSubmit = () => {
    addIncident({
      id: `inc_${Date.now()}`,
      category: aiResult.category,
      severity: aiResult.severity,
      description: `AI Verified: ${aiResult.classification}. Estimated depth: ${aiResult.estimatedDepth}.`,
      location: userLocation || { lat: 28.6139, lng: 77.2090 },
      timestamp: new Date().toISOString(),
      confidenceScore: aiResult.confidence,
      verified: true
    });
    setStep(4);
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Report an Incident</h1>
        <p className="text-slate-400">Help the community by reporting floods, blockages, or hazards. Our AI will verify your report.</p>
      </header>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
            <div className="w-full h-64 border-2 border-dashed border-slate-700 rounded-xl bg-slate-950/50 flex flex-col items-center justify-center hover:bg-slate-900/50 hover:border-cyan-500/50 transition-all cursor-pointer" onClick={handleUpload}>
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <Camera size={32} />
              </div>
              <p className="text-lg font-medium text-slate-300 mb-1">Take a photo of the hazard</p>
              <p className="text-sm text-slate-500">Or tap to upload from gallery</p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-cyan-500">
                <Camera size={24} />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">Analyzing Image with AI...</h3>
              <p className="text-slate-400">Detecting water depth, blockages, and hazards.</p>
            </div>
          </motion.div>
        )}

        {step === 3 && aiResult && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="w-24 h-24 bg-slate-800 rounded-lg shrink-0 flex items-center justify-center text-slate-500 overflow-hidden relative">
                {/* Simulated uploaded image */}
                <img src="https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=300&h=300&fit=crop" alt="Flooded road" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 ring-1 ring-inset ring-slate-700/50 rounded-lg"></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">AI Analysis Complete</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{aiResult.classification}</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
                  <p><strong>Confidence:</strong> {aiResult.confidence}%</p>
                  <p><strong>Depth:</strong> {aiResult.estimatedDepth}</p>
                </div>
              </div>
            </div>

            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="text-rose-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-1">Recommended Action</p>
                <p className="text-slate-300">{aiResult.action}</p>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 px-4 py-3 rounded-lg font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
                Retake Photo
              </button>
              <button onClick={handleSubmit} className="flex-1 px-4 py-3 rounded-lg font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                Submit Report
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white">Report Submitted Successfully</h3>
            <p className="text-slate-400 max-w-sm">Thank you. Your report has been added to the live map and routed to emergency responders.</p>
            <button onClick={() => setStep(1)} className="mt-6 px-6 py-2 rounded-lg font-medium border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">
              Report Another Incident
            </button>
          </motion.div>
        )}

      </div>
    </div>
  );
}

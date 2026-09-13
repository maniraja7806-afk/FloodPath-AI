import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Location, Incident, Shelter, Route } from '../types';
import { initialShelters, initialIncidents } from '../services/mockData';
import { AlertType } from '../components/AlertNotification';

export interface AppAlert {
  id: string;
  title: string;
  message: string;
  type: AlertType;
  duration?: number;
}

interface AppContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  userLocation: Location | null;
  setUserLocation: (loc: Location | null) => void;
  incidents: Incident[];
  addIncident: (incident: Incident) => void;
  shelters: Shelter[];
  simulateDisaster: () => void;
  disasterLevel: number;
  alerts: AppAlert[];
  addAlert: (alert: Omit<AppAlert, 'id'>) => void;
  removeAlert: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [user, setUser] = useState<User | null>({ id: '1', name: 'Citizen Demo', role: 'citizen' });
  const [userLocation, setUserLocation] = useState<Location | null>({ lat: 28.6139, lng: 77.2090 });
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [shelters, setShelters] = useState<Shelter[]>(initialShelters);
  const [disasterLevel, setDisasterLevel] = useState(0); // 0: Normal, 1: Moderate, 2: High
  const [alerts, setAlerts] = useState<AppAlert[]>([]);

  const toggleDemoMode = () => setIsDemoMode(!isDemoMode);

  const addIncident = (incident: Incident) => {
    setIncidents(prev => [incident, ...prev]);
  };

  const addAlert = (alert: Omit<AppAlert, 'id'>) => {
    const id = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setAlerts(prev => [...prev, { ...alert, id }]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const simulateDisaster = () => {
    setDisasterLevel(prev => {
      const nextLevel = prev >= 2 ? 0 : prev + 1;
      
      // Push an alert when disaster level changes
      if (nextLevel === 1) {
        addAlert({
          title: 'Weather Update',
          message: 'Rainfall intensity has increased to 15.4 mm/h. Moderate waterlogging expected in low-lying areas.',
          type: 'warning',
          duration: 6000
        });
      } else if (nextLevel === 2) {
        addAlert({
          title: 'CRITICAL: Severe Flooding Predicted',
          message: 'Heavy continuous rainfall detected (45.8 mm/h). Multiple road segments are becoming impassable. AI advises avoiding Sector 4 completely.',
          type: 'critical',
          duration: 8000
        });
      } else {
        addAlert({
          title: 'Conditions Improving',
          message: 'Rainfall has subsided. Flood waters are beginning to recede. Proceed with caution on previously flooded routes.',
          type: 'info',
          duration: 5000
        });
      }
      
      return nextLevel;
    });
  };

  return (
    <AppContext.Provider value={{
      isDemoMode, toggleDemoMode,
      user, setUser,
      userLocation, setUserLocation,
      incidents, addIncident,
      shelters,
      simulateDisaster, disasterLevel,
      alerts, addAlert, removeAlert
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};

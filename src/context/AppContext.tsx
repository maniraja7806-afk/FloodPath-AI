import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Location, Incident, Shelter, Route } from '../types';
import { initialShelters, initialIncidents } from '../services/mockData';

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
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [user, setUser] = useState<User | null>({ id: '1', name: 'Citizen Demo', role: 'citizen' });
  const [userLocation, setUserLocation] = useState<Location | null>({ lat: 28.6139, lng: 77.2090 }); // Default New Delhi
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [shelters, setShelters] = useState<Shelter[]>(initialShelters);
  const [disasterLevel, setDisasterLevel] = useState(0); // 0: Normal, 1: Moderate, 2: High

  const toggleDemoMode = () => setIsDemoMode(!isDemoMode);

  const addIncident = (incident: Incident) => {
    setIncidents(prev => [incident, ...prev]);
  };

  const simulateDisaster = () => {
    setDisasterLevel(prev => (prev >= 2 ? 0 : prev + 1));
  };

  return (
    <AppContext.Provider value={{
      isDemoMode, toggleDemoMode,
      user, setUser,
      userLocation, setUserLocation,
      incidents, addIncident,
      shelters,
      simulateDisaster, disasterLevel
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

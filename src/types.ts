export type Role = 'citizen' | 'responder' | 'admin' | 'officer';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

export type RiskLevel = 'SAFE' | 'CAUTION' | 'HIGH RISK' | 'BLOCKED';

export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Route {
  id: string;
  name: string;
  path: Location[];
  distance: number; // km
  eta: number; // minutes
  riskLevel: RiskLevel;
  riskScore: number;
  affectedRoads: number;
  rainfall: string;
  reason: string;
  type: 'Safest' | 'Balanced' | 'Fastest';
}

export interface Shelter {
  id: string;
  name: string;
  location: Location;
  distance: number;
  capacity: number;
  occupancy: number;
  facilities: string[];
  contact: string;
}

export type IncidentCategory = 'Flooded Road' | 'Waterlogging' | 'Fallen Tree' | 'Road Blockage' | 'Accident' | 'Other';
export type IncidentSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Incident {
  id: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  description: string;
  location: Location;
  timestamp: string;
  reporterId?: string;
  confidenceScore: number;
  verified: boolean;
  imageUrl?: string;
}

export interface MapData {
  incidents: Incident[];
  shelters: Shelter[];
  userLocation: Location | null;
}

import { Incident, Shelter } from '../types';

export const initialIncidents: Incident[] = [
  {
    id: 'inc1',
    category: 'Flooded Road',
    severity: 'HIGH',
    description: 'Main street is completely submerged. Water level > 0.5m.',
    location: { lat: 28.6150, lng: 77.2100 },
    timestamp: new Date().toISOString(),
    confidenceScore: 94,
    verified: true,
  },
  {
    id: 'inc2',
    category: 'Fallen Tree',
    severity: 'MEDIUM',
    description: 'Tree blocking the right lane.',
    location: { lat: 28.6120, lng: 77.2050 },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    confidenceScore: 82,
    verified: true,
  }
];

export const initialShelters: Shelter[] = [
  {
    id: 'sh1',
    name: 'Central Relief Camp',
    location: { lat: 28.6180, lng: 77.2120 },
    distance: 1.2,
    capacity: 500,
    occupancy: 350,
    facilities: ['Drinking water', 'Food', 'Medical assistance', 'Charging'],
    contact: '+91-800-123-4567'
  },
  {
    id: 'sh2',
    name: 'North Govt School Shelter',
    location: { lat: 28.6250, lng: 77.2000 },
    distance: 2.5,
    capacity: 200,
    occupancy: 50,
    facilities: ['Drinking water', 'Food', 'Accessible entrance'],
    contact: '+91-800-987-6543'
  }
];

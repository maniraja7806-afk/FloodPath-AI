import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, LayersControl } from 'react-leaflet';
import { useAppContext } from '../context/AppContext';
import { Shield, AlertTriangle, User } from 'lucide-react';
import L from 'leaflet';
import { cn } from '../utils';

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customIcon = (color: string) => L.divIcon({
  className: 'custom-icon',
  html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-lg ${color}"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

export default function MapPage() {
  const { incidents, shelters, userLocation, disasterLevel } = useAppContext();
  const [map, setMap] = useState<L.Map | null>(null);

  // Focus map on user location initially
  useEffect(() => {
    if (map && userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [map, userLocation]);

  return (
    <div className="flex-1 flex flex-col relative">
      <div className="absolute top-4 left-4 z-[400] bg-slate-900/90 backdrop-blur border border-slate-800 p-4 rounded-xl shadow-2xl w-80">
        <h2 className="text-xl font-bold text-white mb-2">Live Disaster Map</h2>
        <p className="text-sm text-slate-400 mb-4">Real-time monitoring of flood risks and reported incidents.</p>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500"></div>
            <span className="text-sm font-medium text-slate-300">Severe Incident</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-sm font-medium text-slate-300">Moderate Risk</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-medium text-slate-300">Safe Shelter</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-slate-300">Your Location</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 z-0">
        <MapContainer 
          center={[28.6139, 77.2090]} 
          zoom={13} 
          className="h-full w-full"
          ref={setMap}
          zoomControl={false}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Dark Mode">
              <TileLayer
                attribution='&copy; <a href="https://carto.com/">Carto</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>

            <LayersControl.Overlay checked name="Incidents">
              <>
                {incidents.map(inc => (
                  <Marker 
                    key={inc.id} 
                    position={[inc.location.lat, inc.location.lng]}
                    icon={customIcon(inc.severity === 'HIGH' ? 'bg-rose-500' : 'bg-amber-500')}
                  >
                    <Popup className="bg-slate-900 border border-slate-800 text-white rounded-lg overflow-hidden p-0 shadow-xl">
                      <div className="p-3 bg-slate-900">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle size={16} className={inc.severity === 'HIGH' ? 'text-rose-400' : 'text-amber-400'} />
                          <strong className="text-slate-100">{inc.category}</strong>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{inc.description}</p>
                        <div className="text-xs text-slate-500">Confidence: {inc.confidenceScore}%</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </>
            </LayersControl.Overlay>

            <LayersControl.Overlay checked name="Shelters">
              <>
                {shelters.map(sh => (
                  <Marker 
                    key={sh.id} 
                    position={[sh.location.lat, sh.location.lng]}
                    icon={customIcon('bg-emerald-500')}
                  >
                    <Popup>
                      <div className="p-2">
                        <strong className="block mb-1">{sh.name}</strong>
                        <span className="text-sm">Available: {sh.capacity - sh.occupancy}</span>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </>
            </LayersControl.Overlay>
            
            {/* Risk Zones - Simulated based on disaster level */}
            <LayersControl.Overlay checked name="Flood Risk Zones">
              <>
                {disasterLevel > 0 && (
                  <Circle 
                    center={[28.6150, 77.2100]} 
                    radius={disasterLevel === 1 ? 500 : 1500}
                    pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2, weight: 1 }}
                  />
                )}
                {disasterLevel > 1 && (
                  <Circle 
                    center={[28.6200, 77.2000]} 
                    radius={800}
                    pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2, weight: 1 }}
                  />
                )}
              </>
            </LayersControl.Overlay>

          </LayersControl>

          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon('bg-blue-500')}>
              <Popup>You are here</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

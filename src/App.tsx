/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './layouts/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import RoutesPage from './pages/RoutesPage';
import SheltersPage from './pages/SheltersPage';
import IncidentsPage from './pages/IncidentsPage';
import ResponderDashboard from './pages/ResponderDashboard';
import CommandCenter from './pages/CommandCenter';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/routes" element={<RoutesPage />} />
            <Route path="/shelters" element={<SheltersPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/responder" element={<ResponderDashboard />} />
            <Route path="/command-center" element={<CommandCenter />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

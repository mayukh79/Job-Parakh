import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Analyzer from './pages/Analyzer';
import Dashboard from './pages/Dashboard';
import History from "./pages/History";

// Simple placeholders for pages not yet requested
function DashboardPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="font-display text-[28px] text-glacier mb-2 font-medium">Job Scam Analytics Dashboard</h2>
      <p className="text-[14px] text-pebble max-w-[420px]">
        This dashboard will track overall risk assessments, threat distributions, and historical verification statistics.
      </p>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/analyze" replace />} />
          <Route path="/analyze" element={<Analyzer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<Navigate to="/analyze" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Analyzer from './pages/Analyzer';

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

function HistoryPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h2 className="font-display text-[28px] text-glacier mb-2 font-medium">Verification History Log</h2>
      <p className="text-[14px] text-pebble max-w-[420px]">
        This log will keep a record of all analyzed offers, messages, and sender information audits.
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
          <Route path="/dashboard" element={<DashboardPlaceholder />} />
          <Route path="/history" element={<HistoryPlaceholder />} />
          <Route path="*" element={<Navigate to="/analyze" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
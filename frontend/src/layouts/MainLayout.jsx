import React from 'react';
import Navbar from '../components/Navbar';
import BackgroundGrid from '../components/BackgroundGrid';
import SpectraNoise from "../components/effects/SpectraNoise";
import GradientBlobs from "../components/effects/GradientBlobs";

export default function MainLayout({ children }) {
  return (
  <div className="relative min-h-screen bg-midnight-ink font-sans antialiased text-moonlight flex flex-col">

    <SpectraNoise />
    <GradientBlobs />

    <BackgroundGrid />
      {/* Navigation Top Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className=" relative z-10flex-1 w-full max-w-[1200px] mx-auto px-6 py-[48px] flex flex-col gap-[120px]">
        {children}
      </main>

      {/* Page Footer */}
      <footer className="w-full border-t border-steel-border/50 py-10 mt-auto bg-midnight-ink/40">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-pebble">
          <div>
            &copy; {new Date().getFullYear()} Job Parakh → Verify Before You Apply. <div> Built by Mayukh</div>
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-moonlight transition-colors duration-150">Privacy Policy</a>
            <a href="#terms" className="hover:text-moonlight transition-colors duration-150">Terms of Service</a>
            <a href="#contact" className="hover:text-moonlight transition-colors duration-150">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

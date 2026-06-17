import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="w-full border-b border-steel-border bg-midnight-ink/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Logo Wordmark */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-[18px] font-semibold text-white tracking-tight flex items-center gap-1.5">
            {/* Custom 1.5px stroke shield icon */}
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-moonlight group-hover:text-glacier transition-colors duration-150"
            >
              <path 
                d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Career<span className="text-glacier">Shield</span>
          </span>
        </Link>

        {/* Center: Navigation Links (Pill Style) */}
        <nav className="flex items-center gap-2">
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => 
              `px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-150 ${
                isActive 
                  ? 'text-glacier bg-graphite-plate/80 shadow-subtle' 
                  : 'text-pebble hover:text-moonlight hover:bg-graphite-plate/30'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => 
              `px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-150 ${
                isActive 
                  ? 'text-glacier bg-graphite-plate/80 shadow-subtle' 
                  : 'text-pebble hover:text-moonlight hover:bg-graphite-plate/30'
              }`
            }
          >
            History
          </NavLink>
          <NavLink 
            to="/analyze" 
            className={({ isActive }) => 
              `px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-150 ${
                isActive 
                  ? 'text-glacier bg-graphite-plate/80 shadow-subtle' 
                  : 'text-pebble hover:text-moonlight hover:bg-graphite-plate/30'
              }`
            }
          >
            Analyze
          </NavLink>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* GitHub Icon Link */}
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="text-pebble hover:text-moonlight transition-colors duration-150"
            aria-label="GitHub Repository"
          >
            <svg 
              height="20" 
              viewBox="0 0 16 16" 
              width="20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>

          {/* Primary CTA (Electric Iris) */}
          <Link 
            to="/analyze" 
            className="bg-electric-iris hover:bg-electric-iris/90 active:scale-[0.98] text-white px-4 py-2 text-[14px] font-medium leading-[1.5] transition-all duration-150 cursor-pointer"
            style={{ borderRadius: '2px' }}
          >
            Get started
          </Link>
        </div>

      </div>
    </header>
  );
}

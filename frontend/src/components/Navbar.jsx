import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
   <header className="sticky top-4 z-50 px-6 py-4">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between rounded-full border border-black/10 bg-white/70 px-10 shadow-sm backdrop-blur-xl">

        {/* Left: Logo Wordmark */}
        <Link to="/" className="flex items-center gap-4">
          
         
          <div className="flex flex-col leading-none">
           <span className="text-[20px] font-semibold tracking-tight text-black">
   JOB PARAKH
</span>

           
          </div>
        </Link>

        {/* Center: Navigation Links (Pill Style) */}
        <nav className="flex items-center  justify-center gap-10">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-2 py-1 text-sm font-medium transition-all duration-300 ${isActive
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `px-2 py-1 text-sm font-medium transition-all duration-300 ${isActive
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
              }`
            }
          >
            History
          </NavLink>
          <NavLink
            to="/analyze"
            className={({ isActive }) =>
              `px-2 py-1 text-sm font-medium transition-all duration-300 ${isActive
                ? "border-b-2 border-black text-black"
                : "text-gray-500 hover:text-black"
              }`
            }
          >
            Analyze
          </NavLink>
        </nav>

        {/* Right: Actions */}
        <div className="flex flex-1 justify-end">

          {/* Primary CTA (Electric Iris) */}
          <Link
            to="/analyze"
            className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            Analyze →
          </Link>
        </div>

      </div>
    </header>

  );
}

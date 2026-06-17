import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 -z-50 overflow-hidden bg-midnight-ink min-h-full">
      {/* 40px Blueprint Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(186, 207, 247, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(186, 207, 247, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Center Radial Blueprint Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] pointer-events-none opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(186, 207, 247, 0.18) 0%, rgba(152, 192, 239, 0.06) 40%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />
      
      {/* Conic border arc simulation at top of page viewport */}
      <div 
        className="absolute top-0 left-0 w-full h-[1px]"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(124, 145, 182, 0.3) 25%, rgba(124, 145, 182, 0.5) 50%, rgba(124, 145, 182, 0.3) 75%, transparent)',
        }}
      />
    </div>
  );
}

import React from "react";

export default function SpectraNoise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        opacity: 0.035,
        backgroundImage: `
          repeating-radial-gradient(
            circle at 0 0,
            rgba(0,0,0,0.15) 0,
            rgba(0,0,0,0.15) 1px,
            transparent 1px,
            transparent 4px
          )
        `,
      }}
    />
  );
}
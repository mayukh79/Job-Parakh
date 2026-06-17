import React, { useEffect, useMemo, useRef } from 'react';

const MAX_PARTICLES = 25;

function createParticle(index) {
  return {
    id: index,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    speedX: -0.006 + Math.random() * 0.012,
    speedY: -0.01 - Math.random() * 0.012,
    opacity: 0.05 + Math.random() * 0.08,
  };
}

export default function FloatingParticles({ count = MAX_PARTICLES }) {
  const layerRef = useRef(null);
  const particlesRef = useRef([]);
  const particleCount = Math.min(count, MAX_PARTICLES);

  const particles = useMemo(
    () => Array.from({ length: particleCount }, (_, index) => createParticle(index)),
    [particleCount],
  );

  useEffect(() => {
    particlesRef.current = particles.map((particle) => ({ ...particle }));
  }, [particles]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return undefined;

    const items = Array.from(layer.children);
    let frameId;
    let previousTime = performance.now();

    const animate = (time) => {
      const delta = Math.min(time - previousTime, 32);
      previousTime = time;

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX * delta;
        particle.y += particle.speedY * delta;

        if (particle.x < -2) particle.x = 102;
        if (particle.x > 102) particle.x = -2;
        if (particle.y < -2) particle.y = 102;

        const item = items[index];
        if (item) {
          item.style.transform = `translate3d(${particle.x}vw, ${particle.y}vh, 0)`;
        }
      });

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: particle.size,
            height: particle.size,
            borderRadius: '999px',
            background: '#000',
            opacity: particle.opacity,
            transform: `translate3d(${particle.x}vw, ${particle.y}vh, 0)`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}

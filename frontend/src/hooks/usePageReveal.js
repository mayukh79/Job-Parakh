import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';

function resolveRevealTargets(refs) {
  return refs
    .map((ref) => ref?.current)
    .filter(Boolean);
}

export default function usePageReveal(scopeRef, refs = []) {
  useLayoutEffect(() => {
    const scope = scopeRef?.current;
    const targets = resolveRevealTargets(refs);

    if (!scope || targets.length === 0) return undefined;

    const context = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          autoAlpha: 0,
          y: 60,
        },
        {
          autoAlpha: 1,
          y: 0,
          delay: 0.3,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'transform,opacity,visibility',
        },
      );
    }, scope);

    return () => context.revert();
  }, [scopeRef, refs]);
}

export { usePageReveal };

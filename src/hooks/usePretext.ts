import { useRef, useEffect } from 'react';
import type { PretextModule } from '../data/types';

/**
 * Loads @chenglou/pretext from esm.sh CDN at runtime (not bundled).
 * Returns a ref — setting .current does NOT trigger a re-render.
 * The RAF loop checks for null before calling annotateWithPretext.
 */
export function usePretext() {
  const pretextRef = useRef<PretextModule | null>(null);

  useEffect(() => {
    let cancelled = false;
    // Dynamic CDN import — Vite passes this through untouched at build time
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore — no type declarations for CDN URL imports
    import('https://esm.sh/@chenglou/pretext@0.0.4')
      .then((mod: unknown) => {
        if (!cancelled) pretextRef.current = mod as PretextModule;
      })
      .catch((e: unknown) => {
        console.warn('[pretext] CDN load failed — spring physics still works', e);
      });

    return () => { cancelled = true; };
  }, []);

  return pretextRef;
}

'use client';

import {useEffect, useRef} from 'react';

/** Preserve the existing ordered native interactions after static HTML hydration.
 * All navigation is ordinary same-origin anchors: each destination boots once.
 * No remote code, service writes, analytics or application back end is introduced.
 */
export default function Bootstrap({sources, bodyClass, bodyAttributes}: {sources: string[]; bodyClass: string; bodyAttributes: Record<string, string | undefined>}) {
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    document.body.className = bodyClass;
    for (const [name, value] of Object.entries(bodyAttributes)) {
      if (name.startsWith('data-') && value !== undefined) document.body.setAttribute(name, value);
    }
    document.documentElement.dataset.candidateBoot = 'loading';
    async function start() {
      for (const source of sources) {
        const url = new URL(source, location.href);
        if (url.origin !== location.origin) throw new Error('Only local candidate scripts are allowed.');
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = url.href;
          script.async = false;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Candidate script could not load: ' + url.pathname));
          document.body.append(script);
        });
      }
      document.documentElement.dataset.candidateBoot = 'ready';
      window.dispatchEvent(new Event('candidate:ready'));
    }
    start().catch(error => {
      document.documentElement.dataset.candidateBoot = 'error';
      console.error(error);
    });
  }, [sources, bodyClass, bodyAttributes]);
  return null;
}

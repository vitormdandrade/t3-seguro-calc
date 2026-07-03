'use client';

import { useEffect, useState } from 'react';

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
}

/**
 * Read UTM parameters from window.location.search on mount.
 * Values are stable after hydration — safe for SSR/Next.js.
 */
export function useUtm(): UtmParams {
  const [utm, setUtm] = useState<UtmParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setUtm({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
    });
  }, []);

  return utm;
}

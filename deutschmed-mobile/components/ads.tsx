'use client';

import { useEffect, useState } from 'react';
import { needsPrivacyOptions, openPrivacyOptions, startAds } from '@/lib/ads';

/** Starts AdMob once the app UI is up. Renders nothing. */
export function AdsBootstrap() {
  useEffect(() => {
    void startAds();
  }, []);
  return null;
}

/** "Change ad consent" link, shown only where GDPR requires it. */
export function AdPrivacyOptionsLink() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let active = true;
    needsPrivacyOptions().then((required) => {
      if (active) setVisible(required);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => void openPrivacyOptions()}
      className="text-xs text-slate-500 underline underline-offset-2 hover:text-slate-700"
    >
      Datenschutz-Einstellungen für Werbung
    </button>
  );
}

'use client';

// Google AdMob for the native iOS/Android app (Capacitor).
// Does nothing in a normal browser, so `npm run dev` keeps working.
//
// Real ad unit IDs come from NEXT_PUBLIC_ADMOB_* (baked in at build time).
// Without them the app uses Google's official test units, which are safe to
// tap and never pay out.

import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';

const TEST_IDS = {
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',
    interstitial: 'ca-app-pub-3940256099942544/4411468910',
  },
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
  },
} as const;

const CONFIGURED_IDS = {
  ios: {
    banner: process.env.NEXT_PUBLIC_ADMOB_IOS_BANNER_ID ?? '',
    interstitial: process.env.NEXT_PUBLIC_ADMOB_IOS_INTERSTITIAL_ID ?? '',
  },
  android: {
    banner: process.env.NEXT_PUBLIC_ADMOB_ANDROID_BANNER_ID ?? '',
    interstitial: process.env.NEXT_PUBLIC_ADMOB_ANDROID_INTERSTITIAL_ID ?? '',
  },
};

/** Show a full-screen ad at most every Nth finished exercise ... */
const INTERSTITIAL_EVERY_N_COMPLETIONS = 3;
/** ... and never twice within this many milliseconds. */
const INTERSTITIAL_MIN_GAP_MS = 3 * 60 * 1000;

type Platform = 'ios' | 'android';
type AdKind = 'banner' | 'interstitial';

let startPromise: Promise<boolean> | null = null;
let completionsSinceLastAd = 0;
let lastInterstitialAt = 0;
let privacyOptionsRequired = false;

function nativePlatform(): Platform | null {
  if (!Capacitor.isNativePlatform()) return null;
  const p = Capacitor.getPlatform();
  return p === 'ios' || p === 'android' ? p : null;
}

function adUnit(platform: Platform, kind: AdKind): { adId: string; isTesting: boolean } {
  const configured = CONFIGURED_IDS[platform][kind].trim();
  if (configured) return { adId: configured, isTesting: false };
  return { adId: TEST_IDS[platform][kind], isTesting: true };
}

function setBannerInset(heightPx: number) {
  document.documentElement.style.setProperty('--ad-banner-height', `${Math.max(0, heightPx)}px`);
}

async function start(platform: Platform): Promise<boolean> {
  // GDPR: ask for consent (Google UMP) before any ad request. The form only
  // appears for users who need it, e.g. in the EU.
  let consent = await AdMob.requestConsentInfo();
  if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
    consent = await AdMob.showConsentForm();
  }
  // The plugin doesn't export this enum, so compare to its string value.
  privacyOptionsRequired = String(consent.privacyOptionsRequirementStatus) === 'REQUIRED';
  if (!consent.canRequestAds) return false;

  await AdMob.initialize();

  // Keep page content clear of the native banner at the bottom.
  await AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size) => setBannerInset(size.height));
  await AdMob.addListener(BannerAdPluginEvents.FailedToLoad, () => setBannerInset(0));

  await AdMob.showBanner({
    ...adUnit(platform, 'banner'),
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
  });

  return true;
}

/** Ask for consent, then show the bottom banner. Safe to call more than once. */
export function startAds(): Promise<boolean> {
  const platform = nativePlatform();
  if (!platform) return Promise.resolve(false);
  if (!startPromise) {
    startPromise = start(platform).catch((err) => {
      console.warn('AdMob could not start:', err);
      startPromise = null;
      return false;
    });
  }
  return startPromise;
}

/**
 * Call after the user finishes an exercise. Shows a full-screen ad now and
 * then (see the limits above), never in the middle of an exercise.
 */
export async function onExerciseCompleted(): Promise<void> {
  const platform = nativePlatform();
  if (!platform || !(await startAds())) return;

  completionsSinceLastAd += 1;
  const now = Date.now();
  if (completionsSinceLastAd < INTERSTITIAL_EVERY_N_COMPLETIONS) return;
  if (now - lastInterstitialAt < INTERSTITIAL_MIN_GAP_MS) return;

  try {
    await AdMob.prepareInterstitial(adUnit(platform, 'interstitial'));
    await AdMob.showInterstitial();
    completionsSinceLastAd = 0;
    lastInterstitialAt = Date.now();
  } catch (err) {
    console.warn('Interstitial ad not shown:', err);
  }
}

/** True when the user must be offered a way to change their ad consent (GDPR). */
export async function needsPrivacyOptions(): Promise<boolean> {
  if (!nativePlatform()) return false;
  await startAds();
  return privacyOptionsRequired;
}

/** Re-open Google's consent form so the user can change their choice. */
export async function openPrivacyOptions(): Promise<void> {
  if (!nativePlatform()) return;
  try {
    await AdMob.showPrivacyOptionsForm();
  } catch (err) {
    console.warn('Privacy options form not shown:', err);
  }
}

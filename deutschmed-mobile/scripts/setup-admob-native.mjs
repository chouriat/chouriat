#!/usr/bin/env node
// Adds the AdMob app IDs to the native iOS/Android projects.
// Run after `npx cap add ios` / `npx cap add android`, and again whenever the IDs change:
//
//   ADMOB_ANDROID_APP_ID=ca-app-pub-xxx~yyy ADMOB_IOS_APP_ID=ca-app-pub-xxx~zzz \
//     node scripts/setup-admob-native.mjs
//
// Without the env vars it uses Google's sample app IDs (test ads only).
// Safe to run more than once.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const TEST_ANDROID_APP_ID = 'ca-app-pub-3940256099942544~3347511713';
const TEST_IOS_APP_ID = 'ca-app-pub-3940256099942544~1458002511';
const APP_ID_PATTERN = /^ca-app-pub-\d{10,20}~\d{8,12}$/;

function appId(envName, fallback) {
  const value = process.env[envName]?.trim();
  if (!value) {
    console.log(`${envName} not set: using Google's test app ID.`);
    return fallback;
  }
  if (!APP_ID_PATTERN.test(value)) {
    console.error(`${envName} must look like ca-app-pub-1234567890123456~1234567890 (an app ID, not an ad unit ID).`);
    process.exit(1);
  }
  return value;
}

function setupAndroid() {
  const manifestPath = join(ROOT, 'android/app/src/main/AndroidManifest.xml');
  const stringsPath = join(ROOT, 'android/app/src/main/res/values/strings.xml');
  if (!existsSync(manifestPath)) {
    console.log('android/ not found, skipping Android. Run `npx cap add android` first.');
    return;
  }
  const id = appId('ADMOB_ANDROID_APP_ID', TEST_ANDROID_APP_ID);

  let manifest = readFileSync(manifestPath, 'utf8');
  if (!manifest.includes('com.google.android.gms.ads.APPLICATION_ID')) {
    manifest = manifest.replace(
      /<application([^>]*)>/,
      `<application$1>\n        <meta-data\n            android:name="com.google.android.gms.ads.APPLICATION_ID"\n            android:value="@string/admob_app_id" />`,
    );
    writeFileSync(manifestPath, manifest);
  }

  let strings = readFileSync(stringsPath, 'utf8');
  const line = `<string name="admob_app_id">${id}</string>`;
  strings = /<string name="admob_app_id">[^<]*<\/string>/.test(strings)
    ? strings.replace(/<string name="admob_app_id">[^<]*<\/string>/, line)
    : strings.replace('</resources>', `    ${line}\n</resources>`);
  writeFileSync(stringsPath, strings);
  console.log(`Android: AdMob app ID set to ${id}`);
}

function plistSet(plist, key, valueXml) {
  const existing = new RegExp(`\\s*<key>${key}</key>\\s*(<string>[^<]*</string>|<true/>|<false/>|<array>[\\s\\S]*?</array>)`);
  const entry = `\n\t<key>${key}</key>\n\t${valueXml}`;
  if (existing.test(plist)) return plist.replace(existing, entry);
  const end = plist.lastIndexOf('</dict>');
  return plist.slice(0, end) + entry.slice(1) + '\n' + plist.slice(end);
}

function setupIos() {
  const plistPath = join(ROOT, 'ios/App/App/Info.plist');
  if (!existsSync(plistPath)) {
    console.log('ios/ not found, skipping iOS. Run `npx cap add ios` first.');
    return;
  }
  const id = appId('ADMOB_IOS_APP_ID', TEST_IOS_APP_ID);

  let plist = readFileSync(plistPath, 'utf8');
  plist = plistSet(plist, 'GADApplicationIdentifier', `<string>${id}</string>`);
  // Google's own SKAdNetwork ID. Add partner networks from
  // https://developers.google.com/admob/ios/quick-start#update_your_infoplist if you use mediation.
  plist = plistSet(
    plist,
    'SKAdNetworkItems',
    '<array>\n\t\t<dict>\n\t\t\t<key>SKAdNetworkIdentifier</key>\n\t\t\t<string>cstr6suwn9.skadnetwork</string>\n\t\t</dict>\n\t</array>',
  );
  plist = plistSet(
    plist,
    'NSUserTrackingUsageDescription',
    '<string>Damit zeigen wir dir passendere Werbung und halten DeutschMed kostenlos.</string>',
  );
  writeFileSync(plistPath, plist);
  console.log(`iOS: AdMob app ID set to ${id}`);
}

setupAndroid();
setupIos();

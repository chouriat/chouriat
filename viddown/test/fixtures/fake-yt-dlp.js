#!/usr/bin/env node
'use strict';
// Stand-in for yt-dlp in tests. Logs its arguments to $FAKE_LOG and fails the
// cached ("direct") download when $FAKE_DIRECT_FAILS=1.
const fs = require('fs');
const args = process.argv.slice(2);
fs.appendFileSync(process.env.FAKE_LOG, JSON.stringify(args) + '\n');
if (args.includes('-J')) {
  process.stdout.write(JSON.stringify({ id: 'abc', title: 'Clip', webpage_url: args[args.length - 1], formats: [{ format_id: 'h264', vcodec: 'avc1', acodec: 'mp4a', height: 720 }] }));
  process.exit(0);
}
if (args.includes('--load-info-json') && process.env.FAKE_DIRECT_FAILS === '1') {
  process.stderr.write('ERROR: HTTP Error 403: Forbidden\n');
  process.exit(1);
}
const out = args[args.indexOf('-o') + 1].replace('%(ext)s', 'mp4');
fs.writeFileSync(out, 'video-bytes');
process.exit(0);

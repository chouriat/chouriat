'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { authArgs } = require('../lib/extractor');

function withEnv(env, fn) {
  const keys = ['YTDLP_PROXY', 'YTDLP_PROXY_PLATFORMS', 'YTDLP_COOKIES'];
  const saved = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  for (const k of keys) delete process.env[k];
  Object.assign(process.env, env);
  try { fn(); } finally {
    for (const k of keys) (saved[k] === undefined ? delete process.env[k] : (process.env[k] = saved[k]));
  }
}

test('no proxy configured adds nothing', () => withEnv({}, () => assert.deepStrictEqual(authArgs('tiktok'), [])));

test('proxy applies to every platform when no list is set', () =>
  withEnv({ YTDLP_PROXY: 'http://p:1' }, () => assert.deepStrictEqual(authArgs('reddit'), ['--proxy', 'http://p:1']))
);

test('proxy limited to listed platforms', () =>
  withEnv({ YTDLP_PROXY: 'http://p:1', YTDLP_PROXY_PLATFORMS: ' TikTok , facebook ' }, () => {
    assert.deepStrictEqual(authArgs('tiktok'), ['--proxy', 'http://p:1']);
    assert.deepStrictEqual(authArgs('facebook'), ['--proxy', 'http://p:1']);
    assert.deepStrictEqual(authArgs('instagram'), []);
    assert.deepStrictEqual(authArgs(undefined), []);
  })
);

test('cookies are always passed', () =>
  withEnv({ YTDLP_COOKIES: '/c.txt', YTDLP_PROXY: 'http://p:1', YTDLP_PROXY_PLATFORMS: 'tiktok' }, () =>
    assert.deepStrictEqual(authArgs('x'), ['--cookies', '/c.txt'])
  )
);

const { isTransient } = require('../lib/extractor');

test('dropped proxy connections are retried, real errors are not', () => {
  assert.ok(isTransient(new Error('ERROR: [generic] KSOR8BbwOt: Unable to download webpage: TLS/SSL connection has been closed (EOF)')));
  assert.ok(isTransient(new Error('ProxyError: Tunnel connection failed: 502')));
  assert.ok(!isTransient(new Error('ERROR: [facebook] 1: This video is only available for registered users.')));
  const login = new Error('Unable to download webpage');
  login.userMessage = 'private';
  assert.ok(!isTransient(login));
});

# vid-down

> The site was first called "viddown", which is why this folder is still named `viddown/`. The public name is **vid-down**.

Free, ad-supported website for saving public videos from **TikTok, Instagram, Facebook and X** (plus 18 more, listed in `lib/platforms.js`) as HD/SD MP4 or MP3, without the TikTok watermark.

To add a network, add it to `lib/platforms.js` (link detection for server and browser), give it a mark in `scripts/build.js` and a page entry in `src/content/pages.js`.

- **Frontend**: fast static pages (no framework), original brand, light/dark theme, mobile first, SEO landing page per network, FAQ rich results, sitemap, PWA manifest.
- **Backend**: Node.js + Express. Links are resolved with [yt-dlp](https://github.com/yt-dlp/yt-dlp); ffmpeg merges streams and converts audio to MP3.
- **Monetisation**: Google AdSense units (4 placements) plus `ads.txt`, configured from `.env`.

## Run it locally

Requirements: Node 20+, `yt-dlp` and `ffmpeg` on your PATH.

```bash
# macOS (Homebrew)
brew install yt-dlp ffmpeg
# Debian / Ubuntu
sudo apt install ffmpeg pipx && pipx install yt-dlp
```

The server checks for both tools when it starts and prints `MISSING TOOL` if one is absent. Without yt-dlp every link fails.

```bash
cp .env.example .env      # then edit the values
npm install
npm start                 # builds public/ and serves http://localhost:3000
```

`npm run dev` restarts the server on changes, `npm test` runs the unit tests.

## Project layout

```
server.js              Express app: /api/resolve, /api/download, /api/thumb + static site
lib/platforms.js       Supported networks and URL validation
lib/extractor.js       yt-dlp wrapper and format selection (skips TikTok's watermarked copy)
scripts/build.js       Static site generator: templates, ads, sitemap, robots.txt, ads.txt
src/content/pages.js   ALL page copy (headlines, steps, FAQ, legal pages). Edit text here.
src/assets/            styles.css and app.js
src/static/            Icons, social preview image, web manifest
blocklist.txt          URL fragments to refuse (copyright takedowns)
```

After changing anything in `src/` or `.env`, run `npm run build` (or restart with `npm start`).

## Google AdSense setup

1. Put the site live on your domain first. AdSense reviews the real site.
2. In AdSense, add the site and copy your publisher ID (`ca-pub-…`) into `ADSENSE_CLIENT`.
3. Create four **Display, responsive** ad units and copy their slot IDs:

   | `.env` variable         | Where it shows                                   |
   | ----------------------- | ------------------------------------------------ |
   | `ADSENSE_SLOT_HERO`     | Under the download box                           |
   | `ADSENSE_SLOT_RESULT`   | Appears after a video has been fetched           |
   | `ADSENSE_SLOT_CONTENT`  | Between the feature and network sections         |
   | `ADSENSE_SLOT_FOOTER`   | Above the footer on every page                   |

4. Rebuild. `public/ads.txt` is generated automatically with your publisher ID.
5. Optional: enable **Auto ads → Anchor ads** in AdSense for a sticky bottom banner. No code change is needed, the AdSense script is already on every page.
6. **Consent (required for EEA/UK/Swiss visitors):** in AdSense go to *Privacy & messaging* and publish the GDPR consent message. Google then shows its certified consent banner through the same script.

While `ADSENSE_CLIENT` is empty or still the `XXXX` placeholder, the pages show dashed "Ad space" boxes instead of ads.

AdSense policy notes that are already respected in the layout: ads are labelled "Advertisement", kept visually apart from the download buttons, and nothing asks visitors to click them. Please keep it that way when editing.

## Deploying

The app needs a normal server process (it runs yt-dlp and ffmpeg), so use a VPS or a container host such as Railway, Render, Fly.io or a Docker box. Serverless/static hosts like Vercel or Netlify will not work for the API.

```bash
docker build -t vid-down .
docker run -d -p 3000:3000 --env-file .env --name vid-down vid-down
```

Put it behind HTTPS (Caddy, Nginx or Cloudflare) and set `SITE_URL` to the public address.

Things to know in production:

- **Keep yt-dlp fresh.** Networks change often. Rebuild the image (or run `yt-dlp -U`) every week or two.
- **Datacenter IPs get blocked.** TikTok and especially Instagram may refuse requests from cloud IPs. If links start failing, set `YTDLP_COOKIES` to a cookies file from a throwaway account, or set `YTDLP_PROXY` to route yt-dlp through a residential proxy.
- **Bandwidth.** Every download passes through your server. Watch your host's traffic allowance.
- `TOKEN_SECRET` must be set to a long random value so download links survive restarts.

## Legal

The Terms, Privacy and Copyright pages in `src/content/pages.js` are sensible starting templates, not legal advice. Review them (company name, contact email, log retention period) before launch. Downloading other people's content can breach copyright and the networks' terms of service; the site tells users to download only what they own or have permission to use, and `blocklist.txt` lets you honour takedown requests.

vid-down is not affiliated with any of the networks it supports.

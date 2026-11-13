FROM node:22-bookworm-slim

# yt-dlp does the extraction, ffmpeg merges video+audio and converts to MP3
RUN apt-get update \
 && apt-get install -y --no-install-recommends ffmpeg python3 ca-certificates curl \
 && curl -fsSL https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
 && chmod +x /usr/local/bin/yt-dlp \
 && apt-get purge -y curl && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN chown -R node:node /app

ENV NODE_ENV=production PORT=3000
EXPOSE 3000
USER node
# The site is built at start so AdSense IDs from the environment are baked into the pages.
CMD ["sh", "-c", "node scripts/build.js && node server.js"]

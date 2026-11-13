'use strict';
/**
 * Long-form "guide" text shown under the download box on each page.
 * Google ranks (and AdSense approves) pages with useful written content, so
 * every page gets a few short sections that answer real questions.
 *
 * Shape: { title, sections: [[heading, [paragraph, ...]], ...] }
 * Paragraphs are plain text (they are HTML-escaped by the build).
 */

const deviceSections = (thing, network) => [
  [
    `Saving a ${network} ${thing} on iPhone or iPad`,
    [
      `Open vid-down in Safari, paste the link and tap MP4 HD. Safari asks whether you want to download the file; tap Download. The ${thing} lands in the Files app under Downloads.`,
      'To move it to your Photos library, open the file in Files, tap the Share button and choose Save Video. From then on it behaves like any clip you recorded yourself.',
    ],
  ],
  [
    `Saving a ${network} ${thing} on Android`,
    [
      `In Chrome or any other browser, paste the link, press Get video and choose a format. The ${thing} is saved to the Download folder and usually shows up in your gallery a moment later.`,
      'If you cannot find it, open the Files app (sometimes called My Files) and look in Downloads, or pull down the notification shade and tap the finished download.',
    ],
  ],
  [
    'On a Windows PC, Mac or Chromebook',
    [
      `Copy the address of the ${network} post from your browser bar, paste it into vid-down and pick a format. The file goes to your normal Downloads folder and plays in any modern video player.`,
    ],
  ],
];

const guides = {
  '/': {
    title: 'A short guide to saving videos from social networks',
    sections: [
      [
        'What vid-down does',
        [
          'vid-down turns the link of a public post into a normal video or audio file you can keep. It works with TikTok, Instagram, Facebook, X (formerly Twitter) and 18 other networks, from Pinterest and Reddit to Vimeo and SoundCloud.',
          'You do not install anything and you never sign in. The page reads the link, asks the network for the original file and hands it to your browser as an MP4 or MP3.',
        ],
      ],
      [
        'Which format should I choose?',
        [
          'MP4 HD gives you the sharpest picture the network offers, often 720p or 1080p. It is the best choice for watching on a big screen or editing your own clips.',
          'MP4 SD is a lighter file that loads faster and uses less storage and mobile data. It is ideal for sending in a chat app.',
          'MP3 keeps only the sound. Choose it for a voice note, a podcast clip or a lecture you want to listen to on the go.',
        ],
      ],
      [
        'Why some links do not work',
        [
          'vid-down can only fetch what anyone could watch without logging in. Posts from private accounts, closed groups, Stories visible to friends only, and posts that were deleted or blocked in your country cannot be downloaded.',
          'If a link fails, open the post in a private browser window. If you cannot see the video there, vid-down cannot see it either.',
        ],
      ],
      [
        'Use downloads responsibly',
        [
          'Videos and music belong to the people who made them. Save your own posts, clips you have permission to use, or content for personal offline viewing where your local law allows it. Do not re-upload other people\'s work or pass it off as your own, and always credit the creator when you share.',
        ],
      ],
    ],
  },

  '/tiktok-downloader': {
    title: 'Everything to know about saving TikToks',
    sections: [
      [
        'Why TikToks you save normally carry a watermark',
        [
          'When you use the Save video button inside the TikTok app, TikTok adds its logo and the creator\'s username, which jump around the frame. The app does this to every video it exports.',
          'TikTok also keeps the original upload without those marks. vid-down asks for that original file, so nothing is cropped, blurred or re-encoded and the picture stays exactly as the creator uploaded it.',
        ],
      ],
      [
        'Which TikTok links work',
        [
          'Any link to a single public video works: the long tiktok.com/@user/video/… address from a browser and the short vm.tiktok.com or vt.tiktok.com links the app copies when you tap Share. You can even paste the whole share text; vid-down finds the link inside it.',
          'Links to a profile, a sound page or a live stream are not videos, so they will not work. Open the video itself and copy its link.',
        ],
      ],
      ...deviceSections('video', 'TikTok'),
      [
        'Respect the creator',
        [
          'A clean copy is handy for keeping your own videos, for offline viewing or for reacting to a clip with credit. Re-posting someone else\'s TikTok as your own breaks TikTok\'s rules and usually copyright law, so please credit the creator and ask before reusing their work.',
        ],
      ],
    ],
  },

  '/instagram-downloader': {
    title: 'How Instagram video downloads work',
    sections: [
      [
        'What you can save from Instagram',
        [
          'vid-down saves the video from public Instagram posts: classic feed videos, Reels and the video slides inside a carousel post. When a carousel holds several videos, each one is listed with its own download buttons.',
          'Stories, highlights, live streams and anything from a private account are not available, because Instagram only shows them to signed-in followers.',
        ],
      ],
      [
        'Your Instagram password stays yours',
        [
          'vid-down never asks you to log in to Instagram. Be careful with tools that do: an Instagram password typed into a third-party site can be stolen and used to take over your account.',
        ],
      ],
      ...deviceSections('video', 'Instagram'),
      [
        'If Instagram says the post is unavailable',
        [
          'Instagram sometimes hides posts behind a login wall, for example age-restricted posts or posts limited to certain countries. vid-down cannot open those. Check that the account is public and that the post still exists, then copy the link again.',
        ],
      ],
    ],
  },

  '/instagram-reels-downloader': {
    title: 'Saving Instagram Reels, step by step',
    sections: [
      [
        'Reels in their original quality',
        [
          'Reels are short vertical videos, usually 1080 × 1920 pixels. vid-down fetches the file Instagram itself serves, so you get the same resolution and the original sound, ready to watch offline.',
          'The saved file is a standard MP4 that plays on every phone, tablet and computer, and that you can trim or caption in any video editor.',
        ],
      ],
      [
        'Finding the link of a Reel',
        [
          'In the Instagram app, open the Reel and tap the paper-plane icon, then Copy link. On instagram.com, open the Reel and copy the address from your browser bar. Both look like instagram.com/reel/… and both work.',
        ],
      ],
      [
        'Only want the song or the voice-over?',
        [
          'Tap MP3 instead of MP4 to keep just the audio as a 192 kbps file. Music in Reels is protected by copyright, so keep audio for personal listening unless you have the rights holder\'s permission.',
        ],
      ],
      ...deviceSections('Reel', 'Instagram'),
    ],
  },

  '/facebook-downloader': {
    title: 'A guide to downloading Facebook videos',
    sections: [
      [
        'Which Facebook videos can be saved',
        [
          'vid-down saves videos from posts and Pages that are set to Public, Facebook Reels and finished live broadcasts that are publicly available. Short fb.watch links work exactly like full facebook.com addresses.',
          'Videos shared with friends only, in private groups or in Messenger chats cannot be reached by any outside tool, because Facebook only shows them to signed-in members.',
        ],
      ],
      [
        'HD or SD?',
        [
          'Facebook usually stores two versions of each video. HD is the sharpest, often 720p or 1080p. SD is a smaller file that is easier to share on a slow connection. If the original was uploaded in low resolution, only SD exists.',
        ],
      ],
      ...deviceSections('video', 'Facebook'),
    ],
  },

  '/facebook-reels-downloader': {
    title: 'Saving Facebook Reels',
    sections: [
      [
        'Facebook Reels are just videos',
        [
          'Facebook Reels are short vertical videos, similar to TikToks and Instagram Reels. vid-down treats a Reel like any other public Facebook video and saves it as an MP4 in the best quality on offer.',
        ],
      ],
      [
        'Copying the link of a Facebook Reel',
        [
          'In the Facebook app, open the Reel, tap Share and then Copy link. On a computer, open the Reel and copy the address from the browser bar; it looks like facebook.com/reel/… Paste either link above.',
          'Reels that the creator has shared only with friends cannot be downloaded.',
        ],
      ],
      ...deviceSections('Reel', 'Facebook'),
    ],
  },

  '/twitter-video-downloader': {
    title: 'How to save videos from X (Twitter)',
    sections: [
      [
        'Posts, replies and quotes',
        [
          'Any public post on X that contains a video works, including replies. Paste the link of the post itself. If a post quotes another post with a video, open the quoted post and copy its link instead.',
          'Old twitter.com links and new x.com links are treated the same way, and so are links copied from the X app.',
        ],
      ],
      [
        'Posts with more than one video',
        [
          'A single post can hold up to four videos. vid-down lists each one separately, so you can save just the one you want.',
        ],
      ],
      ...deviceSections('video', 'X'),
      [
        'What cannot be saved',
        [
          'Posts from protected accounts, Spaces audio rooms and videos marked as sensitive that require a login cannot be fetched. Deleted posts disappear for good.',
        ],
      ],
    ],
  },

  '/twitter-gif-downloader': {
    title: 'GIFs on X, explained',
    sections: [
      [
        'Why a GIF from X downloads as MP4',
        [
          'X does not actually store GIFs as GIF files. When someone posts a GIF, X converts it into a short silent MP4 that loops forever. That is why the file you save is an MP4: it is the original file, and it is far smaller and sharper than a real GIF would be.',
          'The MP4 loops in most players and can be sent in WhatsApp, Telegram or iMessage, where it plays like a GIF.',
        ],
      ],
      [
        'Turning it back into a GIF',
        [
          'If you really need a .gif file, for example for an old forum or an email signature, open the MP4 in any free video-to-GIF converter or in an image editor. Keep it short: GIF files grow very large very quickly.',
        ],
      ],
      ...deviceSections('GIF', 'X'),
    ],
  },

  '/tiktok-mp3': {
    title: 'Getting the sound from a TikTok',
    sections: [
      [
        'How the MP3 is made',
        [
          'vid-down fetches the original TikTok, separates the audio track and converts it to a 192 kbps MP3. That bit rate sounds clean on headphones and car speakers while keeping files small, roughly 1.4 MB per minute.',
        ],
      ],
      [
        'Good uses for a TikTok sound',
        [
          'Keep a voice-over or a spoken tip to listen to offline, save a sound you made yourself, or keep the audio of a lecture or podcast clip.',
          'Many TikTok sounds are commercial songs. Those belong to the artist and the label, so use them only for personal listening. To use a song in your own video, add it from TikTok\'s own sound library, where it is licensed.',
        ],
      ],
      [
        'Where the MP3 goes',
        [
          'On iPhone the file lands in Files under Downloads and plays right there. On Android it is in the Download folder and shows up in most music apps. On a computer, look in your Downloads folder.',
        ],
      ],
    ],
  },
};

/** Guide for the secondary networks, built from the per-network facts in pages.js. */
function networkGuide(m) {
  const thing = m.audio ? 'track' : 'video';
  return {
    title: `About saving ${m.name} ${thing}s`,
    sections: [
      [`What you can save from ${m.name}`, [m.about, `vid-down accepts links that look like ${m.example} and works with any public ${m.noun}. ${m.card}`]],
      [
        m.audio ? `Saving a ${m.name} track on your phone or computer` : `Saving a ${m.name} video on your phone`,
        m.audio
          ? [
              'Paste the link, press Get video and tap MP3. On iPhone the file appears in Files under Downloads; on Android, in the Download folder; on a computer, in your Downloads folder.',
            ]
          : [
              'On iPhone, open vid-down in Safari, paste the link and tap MP4 HD. The file goes to Files → Downloads; open it, tap Share and choose Save Video to move it to Photos.',
              'On Android the video is saved in the Download folder and appears in your gallery. On a computer it goes to your Downloads folder.',
            ],
      ],
      [
        `When a ${m.name} link will not work`,
        [
          `The post has to be visible to anyone without logging in. Private, deleted or members-only ${m.noun}s, and content blocked in the server's region, cannot be fetched. Open the link in a private browser window: if you cannot watch it there, vid-down cannot either.`,
        ],
      ],
    ],
  };
}

module.exports = { guides, networkGuide };

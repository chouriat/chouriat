'use strict';
/** All page copy lives here so it can be edited without touching templates. */
const { guides, networkGuide } = require('./guides');

const platformPath = {
  tiktok: '/tiktok-downloader',
  instagram: '/instagram-downloader',
  facebook: '/facebook-downloader',
  x: '/twitter-video-downloader',
  pinterest: '/pinterest-video-downloader',
  reddit: '/reddit-video-downloader',
  snapchat: '/snapchat-video-downloader',
  linkedin: '/linkedin-video-downloader',
  dailymotion: '/dailymotion-downloader',
  twitch: '/twitch-clip-downloader',
  bluesky: '/bluesky-video-downloader',
  tumblr: '/tumblr-video-downloader',
  vimeo: '/vimeo-downloader',
  vk: '/vk-video-downloader',
  okru: '/ok-ru-video-downloader',
  rumble: '/rumble-video-downloader',
  bilibili: '/bilibili-video-downloader',
  telegram: '/telegram-video-downloader',
  soundcloud: '/soundcloud-to-mp3',
  imgur: '/imgur-video-downloader',
  '9gag': '/9gag-video-downloader',
  streamable: '/streamable-downloader',
};

const sharedFeatures = [
  ['sparkle', 'Clean video, no stamp', 'We fetch the original upload, so the clip you save has no floating logo or username bouncing across it.'],
  ['bolt', 'Ready in seconds', 'Paste, tap, save. There is no queue, no countdown and no install step between you and your file.'],
  ['music', 'Video or just the sound', 'Keep the full MP4 in HD, pick a lighter SD file for chat apps, or pull the audio out as an MP3.'],
  ['infinity', 'No caps, no account', 'Save as many clips as you like. vid-down never asks you to register or hand over an email address.'],
  ['device', 'Works on every screen', 'It runs in the browser on iPhone, Android, Windows, Mac and Linux. Nothing to download but the video.'],
  ['shield', 'Private by design', 'We do not keep the videos you fetch or a history of your links. Files are removed as soon as they are sent to you.'],
];

const generalFaq = [
  ['Is vid-down really free?', 'Yes. Every feature is free with no download limit. The site is paid for by the adverts you see on the page.'],
  ['Do I need to create an account or install anything?', 'No. vid-down works entirely in your browser. You never have to sign up, log in or install an app or extension.'],
  ['Where does the file go after I download it?', 'It goes wherever your browser saves downloads. On a computer that is normally the Downloads folder. On iPhone, look in the Files app under Downloads, then use Share → Save Video to move it to Photos. On Android it appears in the Downloads folder and your gallery.'],
  ['Why did my link fail?', 'The most common reasons are that the post is private, was deleted, is limited to certain countries or needs a login to view. vid-down can only fetch posts that are publicly visible.'],
  ['Is it legal to download videos?', 'Saving your own content, or content you have permission to use, for personal viewing is generally fine. Re-uploading or using other people\'s work without their consent can break copyright law and the network\'s rules. You are responsible for how you use what you download.'],
  ['Does vid-down store my videos or links?', 'No. A video is fetched only when you ask for it, held briefly while it is sent to you, then deleted. We do not build a history of what you download.'],
];

const tools = [
  {
    tool: true,
    path: '/',
    platform: null,
    title: 'vid-down — Free Video Downloader for TikTok, Instagram, Facebook, X & More',
    description: 'Save videos from TikTok, Instagram, Facebook, X, Pinterest, Reddit and more without a watermark. Free HD MP4 and MP3 downloads in your browser, no sign-up needed.',
    eyebrow: 'Free · No sign-up · No watermark',
    h1: 'Save any clip, <em>minus the watermark</em>',
    lede: 'Drop in a link from TikTok, Instagram, Facebook, X and many more networks and keep the video in clean HD. Free forever, straight from your browser.',
    placeholder: 'Paste a video link here…',
    stepsTitle: 'Three taps from feed to camera roll',
    stepsLede: 'No app to install and nothing to learn. If you can copy a link, you can use vid-down.',
    steps: [
      ['Copy the link', 'Open the post in the app or on the web, tap Share and choose Copy link.'],
      ['Paste it above', 'Tap Paste, or drop the link in the box, then press Get video. We recognise the network automatically.'],
      ['Choose a format', 'Pick HD MP4, a lighter SD file or MP3 audio and the download starts right away.'],
    ],
    featuresTitle: 'Built to get out of your way',
    features: sharedFeatures,
    faq: generalFaq,
  },
  {
    tool: true,
    path: '/tiktok-downloader',
    platform: 'tiktok',
    title: 'TikTok Downloader Without Watermark — Free HD MP4 | vid-down',
    description: 'Download TikTok videos without the watermark in HD MP4, free and unlimited. Works on iPhone, Android and desktop with no app to install.',
    eyebrow: 'TikTok saver',
    h1: 'TikTok videos, <em>without the watermark</em>',
    lede: 'Keep the dance, the recipe or the tutorial in full quality with no logo drifting across the frame.',
    placeholder: 'Paste a TikTok link, e.g. https://vm.tiktok.com/…',
    stepsTitle: 'How to save a TikTok without the watermark',
    stepsLede: 'Works with links from the TikTok app and from tiktok.com, including short vm.tiktok.com links.',
    steps: [
      ['Tap Share on the video', 'In TikTok, press the arrow on the right of the video and choose Copy link.'],
      ['Paste the link here', 'Come back to vid-down, tap Paste and hit Get video.'],
      ['Save the clean file', 'Choose MP4 HD for the watermark-free video, or MP3 if you only want the sound.'],
    ],
    featuresTitle: 'A better way to keep TikToks',
    features: sharedFeatures,
    card: { title: 'TikTok', text: 'Watermark-free MP4s and sounds from any public TikTok.' },
    faq: [
      ['How does vid-down remove the TikTok watermark?', 'It does not edit or crop anything. TikTok stores a clean copy of each video alongside the stamped one, and vid-down fetches that clean copy, so quality stays exactly as uploaded.'],
      ['Can I download a TikTok on iPhone?', 'Yes. Open vid-down in Safari, paste the link and tap MP4 HD. The file lands in Files → Downloads. Open it and use Share → Save Video to add it to Photos.'],
      ['Can I save videos from private accounts?', 'No. Only public videos can be fetched. If the creator has switched off downloads but the video is public, it will still work.'],
      ...generalFaq.slice(0, 2),
      generalFaq[4],
    ],
  },
  {
    tool: true,
    path: '/instagram-downloader',
    platform: 'instagram',
    title: 'Instagram Video Downloader — Save Reels & Posts in HD | vid-down',
    description: 'Download Instagram videos, Reels and carousel clips in HD MP4 for free. Paste the link, save the clip. No login and no app required.',
    eyebrow: 'Instagram video saver',
    h1: 'Instagram videos, <em>saved in a tap</em>',
    lede: 'Hold on to the feed videos, Reels and carousel clips you love in their original quality, ready to watch offline.',
    placeholder: 'Paste an Instagram link, e.g. https://www.instagram.com/reel/…',
    stepsTitle: 'How to download an Instagram Reel',
    stepsLede: 'Works with Reels, video posts and carousels that contain videos.',
    steps: [
      ['Copy the Reel link', 'Tap the paper-plane or the three dots on the post and choose Copy link.'],
      ['Paste it into vid-down', 'Tap Paste above and press Get video. Carousels show each video separately.'],
      ['Download in HD', 'Pick MP4 HD for the best picture, SD for a smaller file or MP3 for audio.'],
    ],
    featuresTitle: 'Made for Reels',
    features: sharedFeatures,
    card: { title: 'Instagram', text: 'Reels, feed videos and video carousels in original quality.' },
    faq: [
      ['Which Instagram content can I download?', 'Public Reels, video posts and the videos inside carousel posts. Stories and posts from private accounts are not available.'],
      ['Do I have to log in to Instagram?', 'No. vid-down never asks for your Instagram username or password. Be wary of any tool that does.'],
      ['Why does a Reel say it needs a login?', 'Instagram sometimes hides posts behind a login wall, especially age-restricted or regional content. Those posts cannot be fetched.'],
      ...generalFaq.slice(0, 2),
      generalFaq[4],
    ],
  },
  {
    tool: true,
    path: '/facebook-downloader',
    platform: 'facebook',
    title: 'Facebook Video Downloader — Save FB Videos & Reels Free | vid-down',
    description: 'Download Facebook videos and Reels in HD or SD MP4 for free. Works with facebook.com and fb.watch links on phone and desktop.',
    eyebrow: 'Facebook video saver',
    h1: 'Facebook videos, <em>kept for later</em>',
    lede: 'Save public Facebook videos and Reels to watch offline, in HD when it is available.',
    placeholder: 'Paste a Facebook link, e.g. https://fb.watch/…',
    stepsTitle: 'How to download a Facebook video',
    stepsLede: 'Works with public videos, Reels and fb.watch short links.',
    steps: [
      ['Copy the video link', 'On the post, tap Share and then Copy link. On desktop you can copy the address from the browser bar.'],
      ['Paste and fetch', 'Paste the link in the box above and press Get video.'],
      ['Pick HD or SD', 'Choose MP4 HD for the sharpest file or SD to save space and data.'],
    ],
    featuresTitle: 'Simple, quick and free',
    features: sharedFeatures,
    card: { title: 'Facebook', text: 'Public videos and Reels in HD or data-friendly SD.' },
    faq: [
      ['Can I download videos from private groups?', 'No. vid-down can only reach videos that are set to Public. Videos in private groups or shared with friends only are not accessible.'],
      ['Does it work with fb.watch links?', 'Yes. Short fb.watch links and full facebook.com links both work.'],
      ['Why is there no HD option for my video?', 'HD is offered whenever Facebook has an HD copy. If the original was uploaded in low resolution, only that version exists.'],
      ...generalFaq.slice(0, 2),
      generalFaq[4],
    ],
  },
  {
    tool: true,
    path: '/twitter-video-downloader',
    platform: 'x',
    title: 'X (Twitter) Video Downloader — Save Videos from Posts | vid-down',
    description: 'Download videos from X (Twitter) posts in MP4 for free. Paste the post link and save the clip in HD on any device.',
    eyebrow: 'X / Twitter video saver',
    h1: 'Videos from X, <em>saved as MP4</em>',
    lede: 'Grab the clip from any public post on X, formerly Twitter, in the best quality available.',
    placeholder: 'Paste a post link, e.g. https://x.com/user/status/…',
    stepsTitle: 'How to download a video from X',
    stepsLede: 'Works with x.com and twitter.com links, including posts with several videos.',
    steps: [
      ['Copy the post link', 'Tap the share icon under the post and choose Copy link.'],
      ['Paste it above', 'Drop the link into vid-down and press Get video.'],
      ['Save the MP4', 'Pick HD or SD. If the post holds several videos, each one gets its own buttons.'],
    ],
    featuresTitle: 'The quick way to keep a clip',
    features: sharedFeatures,
    card: { title: 'X / Twitter', text: 'Videos from public posts, saved as a regular MP4.' },
    faq: [
      ['Do old twitter.com links still work?', 'Yes. Links that start with twitter.com and x.com are both supported.'],
      ['Can I download videos from protected accounts?', 'No. Posts from protected accounts are only visible to approved followers, so they cannot be fetched.'],
      ['Can I save a GIF from X?', 'GIFs on X are stored as short looping videos, so they download as an MP4 file.'],
      ...generalFaq.slice(0, 2),
      generalFaq[4],
    ],
  },
  {
    tool: true,
    path: '/instagram-reels-downloader',
    platform: 'instagram',
    title: 'Instagram Reels Downloader — Save Reels in HD, Free | vid-down',
    description: 'Download Instagram Reels in full HD MP4 or as MP3 audio. Free, no login, no app. Works on iPhone, Android and desktop.',
    eyebrow: 'Reels saver',
    h1: 'Instagram Reels, <em>kept in full HD</em>',
    lede: 'Save any public Reel with its original picture and sound, ready to watch offline or keep as audio.',
    placeholder: 'Paste a Reel link, e.g. https://www.instagram.com/reel/…',
    stepsTitle: 'How to download an Instagram Reel',
    stepsLede: 'Works with links copied from the Instagram app and from instagram.com.',
    steps: [
      ['Copy the Reel link', 'Open the Reel, tap the paper-plane icon and choose Copy link.'],
      ['Paste it into vid-down', 'Tap Paste above, or drop the link in the box, and press Get video.'],
      ['Save it', 'Pick MP4 HD for the full-quality Reel or MP3 to keep only the sound.'],
    ],
    featuresTitle: 'Made for Reels',
    features: sharedFeatures,
    faq: [
      ['Does it keep the music of the Reel?', 'Yes. The MP4 has the original soundtrack. Music is copyrighted, so keep it for personal viewing unless you have permission to reuse it.'],
      ['Can I download Reels from a private account?', 'No. Only Reels from public accounts can be fetched. vid-down never asks for your Instagram login.'],
      ['Will the creator be notified?', 'No. vid-down does not use your Instagram account, so nothing is sent from it.'],
      ...generalFaq.slice(0, 2),
      generalFaq[4],
    ],
  },
  {
    tool: true,
    path: '/facebook-reels-downloader',
    platform: 'facebook',
    title: 'Facebook Reels Downloader — Save FB Reels in HD | vid-down',
    description: 'Download Facebook Reels as HD MP4 or MP3, free and without signing in. Paste the Reel link and save it on phone or desktop.',
    eyebrow: 'Facebook Reels saver',
    h1: 'Facebook Reels, <em>saved to your phone</em>',
    lede: 'Keep the short videos you love from Facebook in HD, with sound, ready to watch offline.',
    placeholder: 'Paste a Facebook Reel link, e.g. https://www.facebook.com/reel/…',
    stepsTitle: 'How to download a Facebook Reel',
    stepsLede: 'Works with public Reels from the Facebook app and facebook.com.',
    steps: [
      ['Copy the Reel link', 'Open the Reel, tap Share and choose Copy link.'],
      ['Paste and fetch', 'Paste the link in the box above and press Get video.'],
      ['Pick a format', 'Choose MP4 HD, a lighter SD file or MP3 audio.'],
    ],
    featuresTitle: 'Simple, quick and free',
    features: sharedFeatures,
    faq: [
      ['Is a Facebook Reel different from a normal Facebook video?', 'Only in shape: Reels are short and vertical. vid-down saves both the same way.'],
      ['Can I save Reels shared with friends only?', 'No. Only Reels set to Public can be fetched.'],
      ...generalFaq.slice(0, 2),
      generalFaq[4],
    ],
  },
  {
    tool: true,
    path: '/twitter-gif-downloader',
    platform: 'x',
    title: 'Twitter (X) GIF Downloader — Save GIFs as MP4 | vid-down',
    description: 'Save GIFs from X (Twitter) posts for free. GIFs on X are stored as looping MP4 videos; paste the post link and download the original file.',
    eyebrow: 'X / Twitter GIF saver',
    h1: 'GIFs from X, <em>saved in one tap</em>',
    lede: 'Keep the reaction GIF you love. Paste the post link and save the original looping clip.',
    placeholder: 'Paste a post link with a GIF, e.g. https://x.com/user/status/…',
    stepsTitle: 'How to save a GIF from X',
    stepsLede: 'Works with x.com and twitter.com links from the app or the website.',
    steps: [
      ['Copy the post link', 'Tap the share icon under the post with the GIF and choose Copy link.'],
      ['Paste it above', 'Drop the link into vid-down and press Get video.'],
      ['Save the clip', 'Tap the MP4 button. The file loops like a GIF in most players and chat apps.'],
    ],
    featuresTitle: 'The quick way to keep a GIF',
    features: sharedFeatures,
    faq: [
      ['Why is my GIF an MP4 file?', 'X converts every GIF into a short looping MP4 video when it is posted. vid-down gives you that original file, which is smaller and sharper than a real GIF.'],
      ['Can I share it in WhatsApp or iMessage?', 'Yes. Chat apps play short MP4 clips just like GIFs.'],
      ...generalFaq.slice(0, 2),
      generalFaq[4],
    ],
  },
  {
    tool: true,
    path: '/tiktok-mp3',
    platform: 'tiktok',
    title: 'TikTok to MP3 — Download TikTok Sounds & Audio Free | vid-down',
    description: 'Convert any TikTok video to MP3 and download the sound for free. Paste the link and save the audio in seconds.',
    eyebrow: 'TikTok sound saver',
    h1: 'Turn a TikTok into <em>an MP3</em>',
    lede: 'Love the sound more than the video? Pull the audio from any public TikTok as a 192 kbps MP3.',
    placeholder: 'Paste a TikTok link to get its sound…',
    stepsTitle: 'How to save a TikTok sound as MP3',
    stepsLede: 'The same three steps, with one different button at the end.',
    steps: [
      ['Copy the TikTok link', 'Tap Share on the video and choose Copy link.'],
      ['Paste it here', 'Tap Paste above and press Get video.'],
      ['Tap MP3', 'Choose the MP3 button and the audio file downloads to your device.'],
    ],
    featuresTitle: 'Audio without the fuss',
    features: sharedFeatures,
    faq: [
      ['What quality is the MP3?', 'Audio is converted to a 192 kbps MP3, which plays on practically every phone, computer and speaker.'],
      ['Can I use the sound in my own videos?', 'Music and voice recordings are protected by copyright. Use downloaded audio for personal listening unless you have the rights holder\'s permission.'],
      ...generalFaq.slice(0, 3),
    ],
  },
];

/**
 * Secondary networks. Each entry becomes a full landing page; only the parts
 * that differ per network are written out here.
 */
const more = [
  {
    platform: 'pinterest', name: 'Pinterest', noun: 'Pin',
    h1: 'Pinterest videos, <em>saved to your device</em>',
    lede: 'Keep the recipe, the craft idea or the workout from any public video Pin, ready to watch offline.',
    example: 'https://pin.it/…',
    copy: 'Open the Pin, tap the share arrow and choose Copy link.',
    card: 'Video Pins and Idea Pins from any public board.',
    faq: [
      ['Do short pin.it links work?', 'Yes. Both pin.it short links and full pinterest.com links are supported, including country sites such as pinterest.de or pinterest.co.uk.'],
      ['Can I download image Pins?', 'Not yet. vid-down saves video Pins. Pins that contain only a picture are not supported.'],
    ],
  },
  {
    platform: 'reddit', name: 'Reddit', noun: 'post',
    h1: 'Reddit videos, <em>with the sound on</em>',
    lede: 'Reddit stores picture and audio separately. vid-down joins them, so the clip you save actually has sound.',
    example: 'https://www.reddit.com/r/…/comments/…',
    copy: 'Tap Share under the post and choose Copy link.',
    card: 'Videos hosted on Reddit, saved with their audio track.',
    faq: [
      ['Why do other tools give me a Reddit video with no sound?', 'Reddit serves video and audio as two separate streams. vid-down downloads both and merges them into one MP4.'],
      ['Does it work for videos in private communities?', 'No. Only posts in public communities can be fetched.'],
    ],
  },
  {
    platform: 'snapchat', name: 'Snapchat', noun: 'Snap',
    h1: 'Snapchat Spotlight, <em>saved as MP4</em>',
    lede: 'Save public Spotlight videos and public Stories to watch again whenever you like.',
    example: 'https://www.snapchat.com/spotlight/…',
    copy: 'Tap the share arrow on the Spotlight video and choose Copy link.',
    card: 'Public Spotlight videos and public Stories.',
    faq: [
      ['Can I save private Snaps or chats?', 'No. Only content that is public on snapchat.com, such as Spotlight videos, can be downloaded. Private Snaps, chats and friends-only Stories are never accessible.'],
      ['Will the creator know I saved it?', 'vid-down does not use your Snapchat account, so no notification is sent from it.'],
    ],
  },
  {
    platform: 'linkedin', name: 'LinkedIn', noun: 'post',
    h1: 'LinkedIn videos, <em>kept for later</em>',
    lede: 'Hold on to the talk, the product demo or the lesson from a public LinkedIn post.',
    example: 'https://www.linkedin.com/posts/…',
    copy: 'Click the three dots on the post and choose Copy link to post.',
    card: 'Videos from public LinkedIn posts.',
    faq: [
      ['Which LinkedIn videos can I download?', 'Videos in posts that are visible to anyone on or off LinkedIn. Posts limited to connections or to a group cannot be fetched.'],
      ['Do I need to sign in to LinkedIn?', 'No. vid-down never asks for your LinkedIn login.'],
    ],
  },
  {
    platform: 'dailymotion', name: 'Dailymotion', noun: 'video',
    h1: 'Dailymotion videos, <em>in a couple of taps</em>',
    lede: 'Save public Dailymotion videos as MP4, or keep just the audio as an MP3.',
    example: 'https://www.dailymotion.com/video/…',
    copy: 'Click Share under the player and copy the link, or copy the address from your browser.',
    card: 'Public Dailymotion videos in HD or SD.',
    faq: [
      ['Is there a length limit?', 'Very long videos can exceed the file size limit of the service. Short and medium-length videos work best.'],
      ['Do dai.ly short links work?', 'Yes. Both dai.ly and dailymotion.com links are supported.'],
    ],
  },
  {
    platform: 'twitch', name: 'Twitch', noun: 'clip',
    h1: 'Twitch clips, <em>saved as MP4</em>',
    lede: 'Keep the play of the night. Paste a Twitch clip link and save it in the quality it was streamed in.',
    example: 'https://clips.twitch.tv/…',
    copy: 'Open the clip, click Share and copy the clip link.',
    card: 'Clips from any public Twitch channel.',
    faq: [
      ['Can I download whole streams or VODs?', 'vid-down is built for clips. Full broadcasts are usually far larger than the file size limit of the service and will fail.'],
      ['Does it work with subscriber-only content?', 'No. Only clips that anyone can watch without logging in can be fetched.'],
    ],
  },
  {
    platform: 'bluesky', name: 'Bluesky', noun: 'post',
    h1: 'Bluesky videos, <em>saved as MP4</em>',
    lede: 'Grab the video from any public Bluesky post in the best quality available.',
    example: 'https://bsky.app/profile/…/post/…',
    copy: 'Click the share icon under the post and choose Copy link to post.',
    card: 'Videos from public Bluesky posts.',
    faq: [
      ['Which Bluesky posts are supported?', 'Public posts on bsky.app that contain a video. Posts from accounts that hide their content from logged-out visitors cannot be fetched.'],
      ['Can I save GIFs from Bluesky?', 'Animated clips that Bluesky stores as video are saved as MP4 files.'],
    ],
  },
  {
    platform: 'tumblr', name: 'Tumblr', noun: 'post',
    h1: 'Tumblr videos, <em>kept on your device</em>',
    lede: 'Save the video from a public Tumblr post before it disappears from your dashboard.',
    example: 'https://www.tumblr.com/…',
    copy: 'Click the share arrow on the post and choose Copy link.',
    card: 'Videos uploaded to public Tumblr blogs.',
    faq: [
      ['Does it work with videos embedded from other sites?', 'vid-down downloads videos uploaded to Tumblr itself. If a post embeds a video from another supported network, paste the link of the original post instead.'],
      ['Can I download from blogs that require a login?', 'No. Blogs hidden from logged-out visitors cannot be fetched.'],
    ],
  },
  {
    platform: 'vimeo', name: 'Vimeo', noun: 'video',
    h1: 'Vimeo videos, <em>saved for offline</em>',
    lede: 'Keep a public Vimeo video on your device as an MP4, or take just the audio as an MP3.',
    example: 'https://vimeo.com/…',
    copy: 'Click the paper-plane Share button on the player and copy the link.',
    card: 'Public Vimeo videos in HD or SD.',
    faq: [
      ['Why does a Vimeo link fail?', 'Many Vimeo videos are private, password-protected or only viewable when logged in. Only videos that anyone can watch without signing in can be fetched.'],
      ['Can I download videos the owner has disabled downloads for?', 'Please respect the creator\'s settings. Use downloaded videos only where you have the right to do so.'],
    ],
  },
  {
    platform: 'vk', name: 'VK', noun: 'post',
    h1: 'VK videos, <em>saved as MP4</em>',
    lede: 'Save public videos and clips from VK in the best quality on offer.',
    example: 'https://vk.com/video…',
    copy: 'Open the video, click Share and choose Copy link.',
    card: 'Public videos and clips from VK.',
    faq: [
      ['Which VK videos work?', 'Videos that are visible without logging in. Videos limited to friends or to members of a closed community cannot be fetched.'],
      ['Do vkvideo.ru links work?', 'Yes. Links from vk.com, vk.ru and vkvideo.ru are all recognised.'],
    ],
  },
  {
    platform: 'okru', name: 'OK.ru', noun: 'video',
    h1: 'OK.ru videos, <em>kept on your device</em>',
    lede: 'Download public videos from OK.ru (Odnoklassniki) as MP4 in a couple of taps.',
    example: 'https://ok.ru/video/…',
    copy: 'Open the video and copy the address from your browser, or use the Share link under the player.',
    card: 'Public videos from OK.ru (Odnoklassniki).',
    faq: [
      ['Do I need an OK.ru account?', 'No. vid-down never asks for your login. Only videos that are public can be downloaded.'],
      ['Can I save live broadcasts?', 'No. Only finished, recorded videos are supported.'],
    ],
  },
  {
    platform: 'rumble', name: 'Rumble', noun: 'video',
    h1: 'Rumble videos, <em>saved in HD</em>',
    lede: 'Save public Rumble videos to watch offline, as an MP4 or as audio only.',
    example: 'https://rumble.com/v…',
    copy: 'Click Share under the video and copy the link, or copy the address from your browser.',
    card: 'Public Rumble videos in HD or SD.',
    faq: [
      ['Is there a length limit?', 'Very long videos can exceed the file size limit of the service. Shorter videos work best.'],
      ['Can I download live streams?', 'No. Only recorded videos that have finished processing can be fetched.'],
    ],
  },
  {
    platform: 'bilibili', name: 'Bilibili', noun: 'video',
    h1: 'Bilibili videos, <em>saved as MP4</em>',
    lede: 'Download public Bilibili videos with picture and sound joined into one file.',
    example: 'https://www.bilibili.com/video/BV…',
    copy: 'Click Share under the video and copy the link. Short b23.tv links work too.',
    card: 'Public Bilibili videos, with audio merged in.',
    faq: [
      ['Why is the quality lower than on the site?', 'Bilibili reserves its highest resolutions for logged-in or premium members. vid-down fetches the best quality available without an account.'],
      ['Do b23.tv short links work?', 'Yes. Links from bilibili.com, bilibili.tv and b23.tv are recognised.'],
    ],
  },
  {
    platform: 'telegram', name: 'Telegram', noun: 'post',
    h1: 'Telegram channel videos, <em>saved as MP4</em>',
    lede: 'Save the video from a post in any public Telegram channel.',
    example: 'https://t.me/channelname/123',
    copy: 'Tap and hold the post (or right-click it) and choose Copy Post Link.',
    card: 'Videos from posts in public Telegram channels.',
    faq: [
      ['Can I download from private chats or groups?', 'No. Only posts in public channels, which anyone can open in a browser, can be fetched. Private chats, private groups and private channels are never accessible.'],
      ['What should the link look like?', 'A public post link has the form t.me/channelname/123. Invite links and links to a whole channel will not work.'],
    ],
  },
  {
    platform: 'soundcloud', name: 'SoundCloud', noun: 'track', audio: true,
    h1: 'SoundCloud tracks, <em>saved as MP3</em>',
    lede: 'Keep a public SoundCloud track or podcast episode as a 192 kbps MP3 for offline listening.',
    example: 'https://soundcloud.com/artist/track',
    copy: 'Click Share under the track and copy the link.',
    card: 'Public tracks and podcast episodes as MP3.',
    faq: [
      ['Is it legal to download music from SoundCloud?', 'Music is protected by copyright. Download only tracks you made yourself, tracks the artist offers for free download, or tracks you have permission to use.'],
      ['Can I download whole playlists or albums?', 'No. Paste the link of a single track.'],
    ],
  },
  {
    platform: 'imgur', name: 'Imgur', noun: 'post',
    h1: 'Imgur videos and GIFs, <em>saved as MP4</em>',
    lede: 'Save the clip from an Imgur post. Animated GIFs on Imgur are stored as video, so they download as MP4 too.',
    example: 'https://imgur.com/…',
    copy: 'Click Share on the post and choose Copy link.',
    card: 'Video posts and animated GIFs from Imgur.',
    faq: [
      ['Can I download still images?', 'No. vid-down saves videos and animated posts. Posts that contain only pictures are not supported.'],
      ['Why is my GIF saved as an MP4?', 'Imgur converts animated GIFs to video to make them load faster. The MP4 looks the same and is much smaller.'],
    ],
  },
  {
    platform: '9gag', name: '9GAG', noun: 'post',
    h1: '9GAG videos, <em>saved to your device</em>',
    lede: 'Keep the clip that made you laugh. Paste a 9GAG post link and download its video as MP4.',
    example: 'https://9gag.com/gag/…',
    copy: 'Tap Share on the post and choose Copy link.',
    card: 'Video posts from 9GAG.',
    faq: [
      ['Does it work for picture memes?', 'No. Only posts that contain a video or an animated clip can be downloaded.'],
      ['Is there a watermark on the file?', 'vid-down saves the file as 9GAG serves it and does not add anything of its own.'],
    ],
  },
  {
    platform: 'streamable', name: 'Streamable', noun: 'video',
    h1: 'Streamable clips, <em>saved as MP4</em>',
    lede: 'Streamable links expire. Save the clip to your device before it is gone.',
    example: 'https://streamable.com/…',
    copy: 'Copy the Streamable link from your browser or from wherever it was shared.',
    card: 'Clips hosted on Streamable.',
    faq: [
      ['Why did my Streamable link stop working?', 'Clips uploaded without a paid plan are removed by Streamable after a while. Once a clip is deleted there, it can no longer be fetched.'],
      ['Is the quality reduced?', 'No. vid-down downloads the best version Streamable offers for the clip.'],
    ],
  },
];


/** One short, network-specific paragraph used in each secondary page's guide. */
const about = {
  pinterest: 'Pinterest is full of short how-to videos: recipes, crafts, hairstyles and home projects. Video Pins and Idea Pins can be saved as MP4 so you can follow along offline in the kitchen or the workshop.',
  reddit: 'Videos uploaded to Reddit (v.redd.it) are stored as separate picture and sound streams, which is why many tools give you a silent clip. vid-down fetches both and joins them into one MP4 with audio.',
  snapchat: 'Snapchat publishes Spotlight videos and some public Stories on the web at snapchat.com. Those public videos can be saved; private Snaps and chats never leave Snapchat.',
  linkedin: 'LinkedIn posts often hold talks, product demos and short lessons worth keeping. Videos from posts that are visible to everyone can be saved as MP4 for later viewing.',
  dailymotion: 'Dailymotion hosts news clips, sport highlights and longer shows. Public videos can be saved in HD or SD, or as MP3 if you only need the sound.',
  twitch: 'Twitch clips are short highlights cut from a live stream by viewers or the streamer. vid-down saves them in the quality they were streamed, ready to share or rewatch.',
  bluesky: 'Bluesky is an open social network where posts can include short videos. Videos from public posts are saved as standard MP4 files.',
  tumblr: 'Tumblr blogs mix text, art and video. Videos uploaded directly to a public Tumblr post can be saved before they scroll out of your dashboard.',
  vimeo: 'Vimeo is popular with filmmakers, teachers and companies. Many creators let anyone watch their videos; those public videos can be saved for offline viewing.',
  vk: 'VK is one of the largest social networks in Eastern Europe, with its own video section and short clips. Videos visible without logging in can be saved.',
  okru: 'OK.ru (Odnoklassniki) is a social network with a large video library. Public, recorded videos can be saved as MP4.',
  rumble: 'Rumble hosts videos from independent creators, from news commentary to sport and vlogs. Public videos can be saved in HD or as audio only.',
  bilibili: 'Bilibili is a video platform known for animation, gaming and creative content. It splits picture and sound into separate streams; vid-down joins them into one file.',
  telegram: 'Many Telegram channels are public and can be opened in any browser at t.me. Videos posted in those public channels can be saved without the Telegram app.',
  soundcloud: 'SoundCloud is home to independent musicians, DJs and podcasters. Public tracks can be saved as MP3 for listening offline, where the artist allows it.',
  imgur: 'Imgur hosts images and short clips shared across the web. Animated posts are stored as MP4 video, which is what you get when you save them.',
  '9gag': '9GAG is a community for memes and funny clips. Posts that contain a video or an animated clip can be saved as MP4.',
  streamable: 'Streamable is a quick way to share a clip by link, often used for game and sport highlights. Free uploads expire, so save the clip while it is still online.',
};

for (const m of more) {
  m.about = about[m.platform];
  const thing = m.audio ? 'track' : 'video';
  tools.push({
    tool: true,
    path: platformPath[m.platform],
    platform: m.platform,
    title: m.audio ? `${m.name} to MP3 — Free ${m.name} Downloader | vid-down` : `${m.name} Video Downloader — Free MP4 & MP3 | vid-down`,
    description: m.audio
      ? `Download ${m.name} tracks as MP3 for free. Paste the link and save the audio on phone or desktop, no sign-up.`
      : `Download ${m.name} videos for free in MP4 or MP3. Paste the link and save the ${m.noun === 'video' ? 'file' : `video from any public ${m.noun}`} on phone or desktop, no sign-up.`,
    eyebrow: `${m.name} ${m.audio ? 'audio' : 'video'} saver`,
    h1: m.h1,
    lede: m.lede,
    placeholder: `Paste a ${m.name} link, e.g. ${m.example}`,
    stepsTitle: `How to download a ${m.name} ${thing}`,
    stepsLede: m.audio ? `Works with any public ${m.name} ${m.noun}.` : `Works with any public ${m.name} ${m.noun} that contains a video.`,
    steps: [
      ['Copy the link', m.copy],
      ['Paste it above', 'Tap Paste, or drop the link in the box, then press Get video.'],
      m.audio
        ? ['Tap MP3', 'Press the MP3 button and the audio file downloads to your device.']
        : ['Choose a format', 'Pick MP4 HD, a lighter SD file or MP3 audio and the download starts.'],
    ],
    featuresTitle: `${m.name} ${thing}s without the hassle`,
    features: sharedFeatures,
    card: { title: m.name, text: m.card },
    faq: [...m.faq, ...generalFaq.slice(0, 2), generalFaq[4]],
    guide: networkGuide(m),
  });
}

const allFaq = [
  ...generalFaq,
  ...['/tiktok-downloader', '/tiktok-downloader', '/instagram-downloader', '/facebook-downloader', '/twitter-video-downloader', '/tiktok-mp3', '/twitter-gif-downloader'].map(
    (p, i, arr) => tools.find((t) => t.path === p).faq[arr.indexOf(p) === i ? 0 : 1]
  ),
];

const docs = [
  {
    path: '/faq',
    title: 'Frequently Asked Questions | vid-down',
    description: 'Answers to common questions about downloading videos with vid-down: formats, devices, privacy and troubleshooting.',
    html: `<h1>Help &amp; FAQ</h1><p>Short answers to the things people ask most. Still stuck? <a href="/contact">Get in touch</a>.</p>`,
  },
  {
    path: '/how-to-save-videos-iphone-android',
    article: true,
    title: 'How to Save Videos on iPhone & Android | vid-down',
    description: 'Step-by-step guide to saving TikTok, Instagram, Facebook and X videos on iPhone, iPad and Android: where the file goes and how to move it to Photos or your gallery.',
    crumb: 'iPhone & Android guide',
    html: `<h1>How to save videos on iPhone and Android</h1>
<p class="updated">Updated 13 November 2026</p>
<p>Most people use vid-down on their phone. The download itself is the same everywhere: copy the link of a public post, paste it into <a href="/">vid-down</a>, pick a format. What differs is where the file ends up and how you get it into your photo library. This guide covers both.</p>
<h2>Step 1: copy the link of the post</h2>
<ul>
<li><strong>TikTok:</strong> tap the Share arrow on the right of the video, then Copy link.</li>
<li><strong>Instagram:</strong> tap the paper-plane icon under the Reel or post, then Copy link.</li>
<li><strong>Facebook:</strong> tap Share under the video, then Copy link.</li>
<li><strong>X (Twitter):</strong> tap the share icon under the post, then Copy link.</li>
</ul>
<p>Only public posts work. If a post is from a private account or a closed group, no download tool can reach it.</p>
<h2>Step 2 on iPhone and iPad (Safari)</h2>
<ol>
<li>Open <strong>vid-down.com</strong> in Safari. Tap <strong>Paste</strong> (or long-press the box and choose Paste), then <strong>Get video</strong>.</li>
<li>Tap <strong>MP4 HD</strong>. Safari asks whether you want to download the file. Tap <strong>Download</strong>. A blue arrow appears in the address bar while it downloads.</li>
<li>Open the <strong>Files</strong> app, go to <strong>Browse → On My iPhone → Downloads</strong> (or iCloud Drive → Downloads) and tap the video to play it.</li>
<li>To put it in <strong>Photos</strong>, tap the Share button while the video is open and choose <strong>Save Video</strong>.</li>
</ol>
<p><strong>Tip:</strong> in Chrome for iPhone the steps are the same; the finished download opens from the Chrome menu under Downloads, where you can tap Open in… → Save Video.</p>
<h2>Step 2 on Android (Chrome, Samsung Internet, Firefox)</h2>
<ol>
<li>Open <strong>vid-down.com</strong>, tap <strong>Paste</strong> and then <strong>Get video</strong>.</li>
<li>Tap <strong>MP4 HD</strong>. The download starts straight away and a notification shows its progress.</li>
<li>The video is saved in the <strong>Download</strong> folder. Most gallery apps (Google Photos, Samsung Gallery) show it within a few seconds; in Google Photos look under <strong>Library → Download</strong>.</li>
</ol>
<h2>Saving just the sound</h2>
<p>Tap <strong>MP3</strong> instead of MP4 to keep only the audio. On iPhone the MP3 stays in Files and plays there; on Android it appears in the Download folder and in most music players. Music is protected by copyright, so keep downloaded songs for personal listening.</p>
<h2>If something goes wrong</h2>
<ul>
<li><strong>“This post is private or requires a login”</strong>: the account is private, the post is limited to followers or friends, or it is age- or region-restricted.</li>
<li><strong>Nothing happens after tapping MP4 on iPhone</strong>: check Settings → Safari → Downloads and make sure a download location is set, then try again.</li>
<li><strong>The video has no sound</strong>: some posts are silent by design (GIFs on X, for example). Otherwise try the MP4 HD button again; vid-down merges sound and picture for networks that store them separately.</li>
<li><strong>The link worked yesterday</strong>: the post may have been deleted or made private since.</li>
</ul>
<h2>Download responsibly</h2>
<p>Save your own posts, videos you have permission to use, or clips for personal offline viewing where the law allows it. Do not re-upload other people's work as your own, and always credit the creator. More in our <a href="/faq">FAQ</a> and <a href="/terms">terms of use</a>.</p>`,
  },
  {
    path: '/about',
    title: 'About vid-down',
    description: 'vid-down is a free, browser-based tool for saving public videos from TikTok, Instagram, Facebook, X and other social networks.',
    html: `<h1>About vid-down</h1>
<p>vid-down is a small, independent tool with one job: letting you keep a copy of a public video from TikTok, Instagram, Facebook, X or another supported network without fuss. Paste a link, pick a format, done.</p>
<h2>Why it is free</h2>
<p>Running the service costs money for servers and bandwidth. Instead of charging you or limiting downloads, we show a small number of adverts served by Google AdSense. That is the whole business model.</p>
<h2>What we believe</h2>
<ul>
<li><strong>Keep it simple.</strong> No accounts, no apps, no pop-up mazes.</li>
<li><strong>Respect privacy.</strong> We do not keep the videos you fetch or a log of your links.</li>
<li><strong>Respect creators.</strong> vid-down is for saving your own work and for personal, permitted use. Please credit creators and never re-upload work that is not yours.</li>
</ul>
<h2>Independence</h2>
<p>vid-down is not affiliated with, endorsed by or sponsored by TikTok, ByteDance, Instagram, Facebook, Meta, X Corp. or any other network named on this site. All trademarks belong to their owners.</p>
<p>Questions or ideas? <a href="/contact">Contact us</a>.</p>`,
  },
  {
    path: '/contact',
    title: 'Contact | vid-down',
    description: 'Get in touch with the vid-down team for support, feedback, business or copyright enquiries.',
    html: `<h1>Contact us</h1>
<p>We read every message and usually reply within two working days.</p>
<div class="contact-card">
<h3>Email</h3>
<p><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></p>
<p style="margin:0">For a link that will not download, please include the link and the device and browser you are using.</p>
</div>
<h2>Copyright concerns</h2>
<p>If you are a rights holder and want to report misuse, please follow the steps on our <a href="/copyright">Copyright / DMCA</a> page.</p>
<h2>Advertising</h2>
<p>Adverts on vid-down are served through Google AdSense. To advertise here, target this site from your Google Ads account.</p>`,
  },
  {
    path: '/privacy',
    title: 'Privacy & Cookie Policy | vid-down',
    description: 'How vid-down handles your data, what cookies are used and how Google AdSense advertising works on this site.',
    html: `<h1>Privacy &amp; cookie policy</h1>
<p class="updated">Last updated: 11 November 2026</p>
<p>This policy explains what information vid-down ("we", "us") processes when you use {{SITE}} and the choices you have. We have tried to keep it short and readable.</p>
<h2>1. What we collect</h2>
<ul>
<li><strong>Links you submit.</strong> When you paste a link, it is sent to our server so the video can be fetched. We do not store the link or the video once your request has finished.</li>
<li><strong>Technical logs.</strong> Like most websites, our servers briefly record your IP address, browser type and the time of the request. We use this only to keep the service secure, prevent abuse (for example rate limiting) and fix faults. Logs are deleted within 30 days.</li>
<li><strong>Preferences.</strong> Your light or dark theme choice is kept in your browser's local storage. It never leaves your device.</li>
</ul>
<p>We do not ask for your name, email address or any social media login, and vid-down has no user accounts.</p>
<h2>2. Advertising and cookies</h2>
<p>vid-down is funded by adverts served by Google AdSense. Google and its partners use cookies and similar technologies to show and measure ads, and, where you have agreed, to personalise them based on your visits to this and other websites.</p>
<ul>
<li>Google's use of advertising cookies enables it and its partners to serve ads based on your visits to this site and other sites on the internet.</li>
<li>You can opt out of personalised advertising at <a href="https://www.google.com/settings/ads" rel="noopener">Google Ads Settings</a>, or of many third-party vendors' cookies at <a href="https://www.aboutads.info/choices/" rel="noopener">aboutads.info</a>.</li>
<li>More on how Google uses information from sites that use its services: <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">policies.google.com/technologies/partner-sites</a>.</li>
</ul>
<p>If you visit from the European Economic Area, the United Kingdom or Switzerland, you will be asked for your consent before advertising cookies are used, and you can change your choice at any time from the privacy link shown in that message.</p>
<h2>3. Legal bases (EEA/UK visitors)</h2>
<p>We process technical logs on the basis of our legitimate interest in running a secure service. Advertising cookies are used on the basis of your consent.</p>
<h2>4. Sharing</h2>
<p>We do not sell your personal information. Data is shared only with service providers that help us run the site (hosting and Google for advertising) and where the law requires it.</p>
<h2>5. Your rights</h2>
<p>Depending on where you live, you may have the right to access, correct, delete or restrict the use of your personal data, and to object to processing. To exercise these rights, email <a href="mailto:{{EMAIL}}">{{EMAIL}}</a>.</p>
<h2>6. Children</h2>
<p>vid-down is not directed at children under 13, and we do not knowingly collect their personal information.</p>
<h2>7. Changes</h2>
<p>We may update this policy from time to time. The date at the top shows the latest revision.</p>
<h2>8. Contact</h2>
<p>Questions about privacy: <a href="mailto:{{EMAIL}}">{{EMAIL}}</a>.</p>`,
  },
  {
    path: '/terms',
    title: 'Terms of Use | vid-down',
    description: 'The rules for using vid-down, including acceptable use, copyright responsibilities and disclaimers.',
    html: `<h1>Terms of use</h1>
<p class="updated">Last updated: 11 November 2026</p>
<p>By using {{SITE}} ("vid-down", "the service") you agree to these terms. If you do not agree, please do not use the service.</p>
<h2>1. The service</h2>
<p>vid-down is a free tool that helps you save a copy of publicly available videos from third-party platforms. We do not host, upload or index any videos ourselves.</p>
<h2>2. Acceptable use</h2>
<p>You agree to use vid-down only:</p>
<ul>
<li>for content that you own, or that you have the rights holder's permission to download; or</li>
<li>for personal, non-commercial use where the law in your country allows it.</li>
</ul>
<p>You agree not to use vid-down to infringe copyright or other rights, to harass anyone, to download private content, to run automated or bulk requests, or to interfere with the service.</p>
<h2>3. Your responsibility</h2>
<p>You are solely responsible for the content you download and what you do with it, including compliance with the terms of the platform it came from.</p>
<h2>4. Intellectual property</h2>
<p>All videos, sounds and trademarks remain the property of their respective owners. vid-down is not affiliated with TikTok, Instagram, Facebook, Meta, X Corp. or any other network named on this site. The vid-down name, logo and site design belong to us.</p>
<h2>5. No warranty</h2>
<p>The service is provided "as is" and "as available". We do not guarantee that it will be uninterrupted, error-free or able to fetch any particular video.</p>
<h2>6. Limitation of liability</h2>
<p>To the fullest extent permitted by law, vid-down is not liable for any indirect, incidental or consequential loss arising from your use of the service.</p>
<h2>7. Advertising</h2>
<p>The service displays third-party adverts. We are not responsible for the content of adverts or the sites they lead to.</p>
<h2>8. Changes</h2>
<p>We may change or discontinue the service, or update these terms, at any time. Continued use means you accept the updated terms.</p>
<h2>9. Contact</h2>
<p><a href="mailto:{{EMAIL}}">{{EMAIL}}</a></p>`,
  },
  {
    path: '/copyright',
    title: 'Copyright & DMCA | vid-down',
    description: 'How rights holders can report copyright concerns to vid-down.',
    html: `<h1>Copyright &amp; DMCA</h1>
<p>vid-down respects the rights of creators. We do not host or store any video. Files are fetched from the original platform at a user's request and delivered directly to that user.</p>
<h2>Reporting a concern</h2>
<p>If you believe vid-down is being used to infringe your copyright, email <a href="mailto:{{EMAIL}}">{{EMAIL}}</a> with:</p>
<ul>
<li>your name and contact details;</li>
<li>a description of the copyrighted work;</li>
<li>the URL(s) of the content on the original platform;</li>
<li>a statement that you have a good-faith belief the use is not authorised by the owner, its agent or the law;</li>
<li>a statement, under penalty of perjury, that the information is accurate and that you are the owner or authorised to act for the owner;</li>
<li>your physical or electronic signature.</li>
</ul>
<p>On receiving a valid notice we can block the reported URL(s) from being processed by vid-down.</p>
<h2>Removing the original</h2>
<p>Because the content lives on the original platform, the most effective way to stop it spreading is to report it to that platform directly, or to make your account private.</p>`,
  },
  {
    path: '/404',
    noindex: true,
    title: 'Page not found | vid-down',
    description: 'This page does not exist.',
    html: `<h1>That page wandered off</h1><p>The link you followed does not exist any more. Head back to the <a href="/">downloader</a> and paste a video link to get going.</p>`,
  },
];

for (const t of tools) if (!t.guide && guides[t.path]) t.guide = guides[t.path];

module.exports = { tools, docs, allFaq, platformPath };

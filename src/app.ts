import { configBot } from './config';
import { ClientDiscord, DistubeClient } from './infrastructure/discord';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

const main = async () => {
   const client = ClientDiscord.create();
   const distube = DistubeClient.create(
      client,
      configBot,
      ffmpegPath.path, [
      new SpotifyPlugin(),
      new YtDlpPlugin()
   ]);
}


(async () => {
   await main();
})();
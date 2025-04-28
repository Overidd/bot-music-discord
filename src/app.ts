import { configBot } from './config';
import { ClientDiscord, DistubeClient } from './infrastructure/discord';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

const main = async () => {
   const client = new ClientDiscord();
   const distube = new DistubeClient({
      client,
      configBot,
      ffmpegPath: ffmpegPath.path,
      plugins: [
         new SpotifyPlugin(),
         new YtDlpPlugin()
      ]
   });


   client.login(configBot.TOKENS[0]);
}





(async () => {
   await main();
})();
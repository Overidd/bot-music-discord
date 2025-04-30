import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { ClientDiscord, DistubeClient } from './infrastructure/discord';
import { CommandFileLoader, EventFileLoader } from './infrastructure/fileLoader';
import { configBot } from './config';

const main = async () => {
   const client = new ClientDiscord();
   const distube = new DistubeClient({
      client,
      ffmpegPath: ffmpegPath.path,
      plugins: [
         new SpotifyPlugin(),
         new SoundCloudPlugin(),
         new YtDlpPlugin(),
      ]
   });

   const commands = await new CommandFileLoader(configBot)
      .loadCommands();
   const events = await new EventFileLoader(configBot)
      .loadEvents();

   client.setCommand(commands)
      .setConfig(configBot)
      .setPlayer(distube)
      .setOnceClientEvent(events.onceClientEvents)
      .setOnClientEvent(events.onClientEvents)
      .setOnPlayerEvent(events.onPlayerEvents)
      .login(configBot.TOKEN);
}

(async () => {
   await main();
})();
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { configBot } from './config';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { SpotifyPlugin } from '@distube/spotify';
import { ClientDiscord, DistubeClient } from './infrastructure/discord';
import { CommandFileLoader, EventFileLoader } from './infrastructure/fileLoader';

const main = async () => {
   const commands = await new CommandFileLoader(configBot)
      .loadCommands();

   const events = await new EventFileLoader(configBot)
      .loadEvents();

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

   client.setCommand(commands)
      .setConfig(configBot)
      .setPlayer(distube)
      .setOnceClientEvent(events.onceEvents)
      .setOnClientEvent(events.onEvents)
      .login(configBot.TOKEN);
}

(async () => {
   await main();
})();
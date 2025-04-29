import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { ClientDiscord, DistubeClient } from './infrastructure/discord';
import { CommandFileLoader, EventFileLoader } from './infrastructure/fileLoader';
import { configBot } from './config';

// process.env.FFMPEG_PATH = ffmpegPath.path;
const main = async () => {
   const commands = await new CommandFileLoader(configBot)
      .loadCommands();
   const events = await new EventFileLoader(configBot)
      .loadEvents();

   const client = new ClientDiscord();
   const distube = new DistubeClient({
      client,
      ffmpegPath: ffmpegPath.path,
      plugins: [
         new SpotifyPlugin(),
         new SoundCloudPlugin(),
         new YtDlpPlugin()
      ]
   });

   client.setCommand(commands)
      .setConfig(configBot)
      .setPlayer(distube)
      .setOnceClientEvent(events.onceEvents)
      .setOnClientEvent(events.onEvents)
      .login(configBot.TOKEN);

   console.log('Bot iniciado');
}

(async () => {
   await main();
})();
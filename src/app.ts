import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { configBot } from './config';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { SpotifyPlugin } from '@distube/spotify';
import { ClientDiscord, DistubeClient } from './infrastructure/discord';
import { CommandFileLoader, EventFileLoader } from './infrastructure/fileLoader';
import SoundCloudPlugin from '@distube/soundcloud';

const main = async () => {

   process.env.FFMPEG_PATH = ffmpegPath.path;

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
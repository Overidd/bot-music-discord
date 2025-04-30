import { Client } from 'discord.js';
import { DisTube, DisTubeOptions, DisTubePlugin } from 'distube';

interface IDistubeClient {
   client: Client<boolean>,
   ffmpegPath: string,
   plugins: DisTubePlugin[]
}

export class DistubeClient extends DisTube {
   constructor({ client, ffmpegPath, plugins }: IDistubeClient) {
      const distubeOptions: DisTubeOptions = {

         // leaveOnStop: configBot.voiceConfig.leaveOnStop,
         // leaveOnFinish: configBot.voiceConfig.leaveOnFinish,
         // leaveOnEmpty: configBot.voiceConfig.leaveOnEmpty.status,
         emitNewSongOnly: true,
         emitAddSongWhenCreatingQueue: false,
         emitAddListWhenCreatingQueue: false,
         ffmpeg: {
            path: ffmpegPath
         },
         plugins: plugins,
      };

      super(client, distubeOptions);
   }
}
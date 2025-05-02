import { DisTube, DisTubeOptions, DisTubePlugin } from 'distube';
import { Client } from 'discord.js';

interface IDistubeClient {
   client: Client<boolean>,
   ffmpegPath: string,
   plugins: DisTubePlugin[]
}

export class ClientDistube extends DisTube {

   constructor({ client, ffmpegPath, plugins }: IDistubeClient) {
      const distubeOptions: DisTubeOptions = {
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
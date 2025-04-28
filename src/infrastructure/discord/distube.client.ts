import { DisTube, DisTubeOptions, Plugin } from 'distube';
import { Client } from 'discord.js';
import { IConfigBot } from '../../doman/interface';

interface IDistubeClient {
   client: Client<boolean>,
   configBot: IConfigBot,
   ffmpegPath: string,
   plugins: any[]
}

export class DistubeClient extends DisTube {
   constructor({ client, configBot, ffmpegPath, plugins }: IDistubeClient) {
      const distubeOptions = {
         leaveOnStop: configBot.voiceConfig.leaveOnStop,
         leaveOnFinish: configBot.voiceConfig.leaveOnFinish,
         leaveOnEmpty: configBot.voiceConfig.leaveOnEmpty.status,
         emitNewSongOnly: true,
         emitAddSongWhenCreatingQueue: false,
         emitAddListWhenCreatingQueue: false,
         ffmpegPath,
         plugins,
      };

      super(client, distubeOptions);
   }
}
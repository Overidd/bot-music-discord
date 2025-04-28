import DisTube from 'distube';
import { Client } from 'discord.js';

import { IConfigBot } from '../../doman/interface';

export class DistubeClient {
   static create(client: Client<boolean>, configBot: IConfigBot, ffmpegPath: string, plugins: any[]) {

      const configDistube = {
         leaveOnStop: configBot.voiceConfig.leaveOnStop,
         leaveOnFinish: configBot.voiceConfig.leaveOnFinish,
         leaveOnEmpty: configBot.voiceConfig.leaveOnEmpty.status,
         emitNewSongOnly: true,
         emitAddSongWhenCreatingQueue: false,
         emitAddListWhenCreatingQueue: false,
         ffmpegPath: ffmpegPath,
         plugins: plugins
      }

      return new DisTube(client, configDistube)
   }
}
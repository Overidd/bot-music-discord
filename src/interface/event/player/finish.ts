import { checkFFmpeg, Events, Queue, Song } from 'distube';
import { ClientDiscord, EmbedComponent } from '../../../infrastructure/discord';
import { PanelStatusHandler } from '../../../application/handler/controlPanel';
import { Timeout } from '../../../utils';

const options = {
   name: Events.FINISH,
   once: false,
}

const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {


   console.log('------------FINISH------------');
   console.log(queue?.songs);

   const controlPanelStatus = PanelStatusHandler.get(
      client,
      queue?.textChannel?.guildId!
   )
   const embedComponent = new EmbedComponent()
      .setLang(controlPanelStatus?.getLang)

   PanelStatusHandler.delete(client, queue.textChannel?.guildId!)

   const message = await queue.textChannel?.send({
      embeds: [embedComponent.success('successFinished')]
   });

   if (!message) return;

   Timeout.delete(message)
}

export const event = {
   ...options,
   execute
} 
import { Events, Queue, Song } from 'distube';
import { ClientDiscord, EmbedComponent } from '../../../infrastructure/discord';
import { PanelStatusHandler } from '../../../application/handler/controlPanel';
import { Timeout } from '../../../utils';

const options = {
   name: Events.FINISH,
   once: false,
}

const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {
   PanelStatusHandler.delete(client, queue.textChannel?.guildId!)

   const message = await queue.textChannel?.send({
      embeds: [EmbedComponent.success('Finalizado')]
   });
   if (!message) return;

   Timeout.delete(message)
}

export const event = {
   ...options,
   execute
}
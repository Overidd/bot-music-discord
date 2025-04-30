import { Events, Queue, Song } from 'distube';
import { ClientDiscord } from '../../../infrastructure/discord';
import { EmbedBuilder } from 'discord.js';

const options = {
   name: Events.FINISH,
   once: false,
}

const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {
   const emdeb = new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(`\`Finalizado\``)

   const message = await queue.textChannel?.send({
      embeds: [emdeb]
   });

   if (!message) return;

   const timeout = setTimeout(() => {
      message.delete().catch(console.error);
      clearTimeout(timeout)
   }, 60 * 1000); // 1 minuto
}

export const event = {
   ...options,
   execute
}
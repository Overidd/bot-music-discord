import { Events, Queue, Song } from 'distube';

const options = {
   name: Events.ADD_SONG,
   once: false
}

const execute = async (client: any, queue: Queue, song: Song, ...args: any) => {

   console.log('Evento ADD_SONG');


   // const emdeb = new EmbedBuilder()
   //    .setColor('#0099ff')
   //    .setDescription(`Se Agrego: \`${song.name}\`⏱️[${song.formattedDuration}]`)

   // const message = await queue.textChannel?.send({
   //    embeds: [emdeb]
   // });

   // if (!message) return

   // const timeout = setTimeout(() => {
   //    message.delete().catch(console.error);
   //    clearTimeout(timeout)
   // }, 60 * 1000 * 7)
}

export const event = {
   ...options,
   execute
}

import { Events, Queue, Song } from 'distube'
import { ClientDiscord, controlComponent } from '../../../infrastructure/discord'

const options = {
   name: Events.PLAY_SONG,
   once: false
}

//Este evento se ejecuta cuando se reproduce una nueva cancion
const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {

   //TODO: puede ser que pordiramos obtener el idioma del servidor
   console.log(queue.songs.length);
   if (queue.songs.length > 1) return;

   const { components, embeds } = controlComponent({
      nameMusic: song?.name,
      duration: song?.formattedDuration,
      currentDuration: '00:00',
      imageMusic: song?.thumbnail,
      voiceChannel: queue.voiceChannel?.name,
      quantityInQueue: String(queue.songs.length - 1)
   })

   const sentMessage = await queue.textChannel?.send({
      embeds,
      components,
   }) as { delete: any };

   const timeout = setTimeout(() => {
      sentMessage.delete().catch(console.error);
      clearTimeout(timeout)
   }, 60 * 1000 * 7)
}

export const event = {
   ...options,
   execute
}



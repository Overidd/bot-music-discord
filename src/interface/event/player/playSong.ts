import { Events, Queue, Song } from 'distube'
import { ClientDiscord, controlComponent, EmdebComponent } from '../../../infrastructure/discord'

const options = {
   name: Events.PLAY_SONG,
   once: false
}

//Este evento se ejecuta cuando se reproduce una nueva cancion
const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {

   //TODO: puede ser que pordiramos obtener el idioma del servidor
   if (queue.songs.length > 1) return;

   try {
      const { components, embeds } = controlComponent({
         volumen: String(queue.volume),
         nameMusic: song?.name,
         urlMusic: song.url,
         nameSourceMusic: song.source,
         duration: song?.formattedDuration,
         currentDuration: '00:00',
         imageMusic: song?.thumbnail,
         voiceChannel: queue.voiceChannel?.name,
         quantityInQueue: String(queue.songs.length)
      })

      const sentMessage = await queue.textChannel?.send({
         embeds,
         components,
      }) as { delete: any };

      const timeout = setTimeout(() => {
         sentMessage.delete().catch(console.error);
         clearTimeout(timeout)
      }, 60 * 1000 * 7)

   } catch (error) {
      const sentMessage = await queue.textChannel?.send({
         embeds: [EmdebComponent.emdebError('❌ Lo siento ocurrio un error')]
      }) as { delete: any };

      const timeout = setTimeout(() => {
         sentMessage.delete().catch(console.error);
         clearTimeout(timeout)
      }, 5000);
   }
}

export const event = {
   ...options,
   execute
}



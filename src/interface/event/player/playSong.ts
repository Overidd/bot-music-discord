import { Events, Queue, Song } from 'distube'
import { ClientDiscord, PanelStatusComponent, EmdebComponent } from '../../../infrastructure/discord'
import { PanelStatusHandler } from '../../../application/handler/controlPanel'

const options = {
   name: Events.PLAY_SONG,
   once: false
}

//Este evento se ejecuta cuando se reproduce una nueva cancion
const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {

   //TODO: puede ser que pordiramos obtener el idioma del servidor
   try {
      const panelControlComponent = new PanelStatusComponent()
      const embed = panelControlComponent.embed.create()
         .header({
            imageMusic: song?.thumbnail,
            nameMusic: song?.name,
            nameSourceMusic: song.source,
            urlMusic: song.url
         })
         .body({
            duration: song?.formattedDuration,
            quantityInQueue: String(queue.songs.length),
            volumen: String(queue.volume),
         })
         .build()

      const components = panelControlComponent.buttons.create()
         .buildRows()

      const sentMessage = await queue.textChannel?.send({
         embeds: [embed],
         components,
      });

      PanelStatusHandler.delete(client, queue.textChannel?.guildId!)

      PanelStatusHandler.create(client, {
         guildId: queue.textChannel?.guildId!,
         controlPanel: sentMessage!
      })

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
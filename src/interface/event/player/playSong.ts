import { Events, Queue, Song } from 'distube';
import { ErrorService } from '../../../application/service';
import { PanelStatusHandler } from '../../../application/handler/controlPanel';
import { ClientDiscord, PanelStatusComponent } from '../../../infrastructure/discord';

const options = {
   name: Events.PLAY_SONG,
   once: false
}

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
         .footer({
            text: '\u00A0',
            iconUser: 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746313476/qukbvlboemwfpgxgdd5s.gif'
         })
         .build()

      const components = panelControlComponent.buttons.create({
         isActiveSong: queue?.volume > 0,
         isPlaying: queue?.playing && !queue?.paused,
         isActiveLoop: queue?.repeatMode === 2,
      }).buildRows()

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
      ErrorService.send(queue, error as Error)
   }
}

export const event = {
   ...options,
   execute
}
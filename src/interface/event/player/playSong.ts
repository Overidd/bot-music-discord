import { Events, Queue, Song } from 'distube';
import { ControlPanelStatusEntity } from '../../../doman/entity';
import { ErrorService, LangService } from '../../../application/service';
import { PanelStatusHandler } from '../../../application/handler/controlPanel';
import { ClientDiscord, PanelStatusComponent } from '../../../infrastructure/discord';

const options = {
   name: Events.PLAY_SONG,
   once: false
}

const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {
   let lang;
   //TODO: puede ser que pordiramos obtener el idioma del servidor
   try {
      if (!queue.textChannel?.guildId) throw Error;

      const controlPanelStatus = PanelStatusHandler.get(
         client,
         queue.textChannel?.guildId
      )
      if (!controlPanelStatus) {
         lang = LangService.get(queue.textChannel?.guildId)
      }

      const embed = new PanelStatusComponent.Embed()
         .setLang(lang)
         .create()
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

      const components = new PanelStatusComponent.Buttons()
         .setLang(lang ?? controlPanelStatus?.getLang)
         .create({
            isActiveSong: queue?.volume > 0,
            isPlaying: queue?.playing && !queue?.paused,
            isActiveLoop: queue?.repeatMode === 2,
         }).buildRows()

      const sentMessage = await queue.textChannel?.send({
         embeds: [embed],
         components,
      });

      if (controlPanelStatus && controlPanelStatus?.setRespon) {
         controlPanelStatus.setRespon(sentMessage)

      } else {
         const controlPanelStatusEntity = new ControlPanelStatusEntity()
            .setRespon(sentMessage)
            .setData({
               lang: lang ?? controlPanelStatus?.getLang!,
               guildId: queue.textChannel.guildId,
               valume: 50,
            })

         PanelStatusHandler.create(client, controlPanelStatusEntity);
      }

   } catch (error) {
      ErrorService.send(queue, error as Error)
   }
}

export const event = {
   ...options,
   execute
}
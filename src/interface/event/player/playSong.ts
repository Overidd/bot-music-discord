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

   try {
      if (!queue.textChannel?.guildId) throw Error;

      // if (queue?.stopped && !queue?.playing && !queue.paused) {
      //    console.log('------ ENTRO XD ------');
      //    return
      // }

      // console.log('PLAY_SONG');


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
            volume: String(queue.volume),
         })
         .footer({
            text: '\u00A0',
            iconUser: 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746313476/qukbvlboemwfpgxgdd5s.gif'
         })
         .build();
      console.log('-------1--------');
      console.log(queue.songs);
      console.log(queue.previousSongs);
      console.log(queue?.playing && !queue?.paused);
      console.log(queue?.playing, queue?.paused);
      const components = new PanelStatusComponent.Buttons()
         .setLang(lang ?? controlPanelStatus?.getLang)
         .create({
            isActiveSong: queue?.volume > 0,
            isPlaying: queue?.playing && !queue?.paused,
            isActiveLoop: queue?.repeatMode === 2,
         }).buildRows();

      await controlPanelStatus?.deleteBtnSkipInteraction()
      await controlPanelStatus?.deleteBtnBackInteraction()

      console.log('-------2--------');
      console.log(queue.songs);
      console.log(queue.previousSongs);
      console.log(queue?.playing && !queue?.paused);
      console.log(queue?.playing, queue?.paused);

      const sentMessage = await queue.textChannel?.send({
         embeds: [embed],
         components,
      });

      // if (!queue?.playing && !queue?.paused && !queue.stopped) {
      //    await sentMessage?.delete()
      //    // sentMessage.st
      //    await queue.stop()
      //    return
      // }

      if (controlPanelStatus && sentMessage) {
         controlPanelStatus.setRespon(sentMessage)

      } else {
         const controlPanelStatusEntity = new ControlPanelStatusEntity()
            .setRespon(sentMessage)
            .setData({
               lang: lang ?? 'es',
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
import { DisTubeError, Events, Queue, Song } from 'distube'
import { ClientDiscord, EmbedComponent } from '../../../infrastructure/discord'
import { PanelStatusHandler } from '../../../application/handler/controlPanel';
import { Timeout } from '../../../utils';
import { SongService } from '../../../application/service';

const options = {
   name: Events.ERROR,
   once: false
}

const execute = async (client: ClientDiscord, error: any, queue: Queue, song: Song) => {

   try {
      const controlPanelStatus = PanelStatusHandler.get(
         client,
         queue.textChannel?.guildId!
      );


      const embed = new EmbedComponent()
         .setLang(controlPanelStatus?.getLang)
         .error('errro500');

      PanelStatusHandler.delete(
         client,
         queue.textChannel?.guildId!
      )


      if (error.name === 'FFMPEG_EXITED') {
         // Verificar si hay canciones restantes en la cola
         if (queue.songs.length > 0) {
            try {
               // Omitir la canción actual y reproducir la siguiente
               await queue.skip();
            } catch (skipError) {
               console.error('Error al intentar saltar a la siguiente canción:', skipError);
            }
         }
      } else {
         console.error('Error no manejado:', error);
      }
      // if (error instanceof DisTubeError && error.errorCode === 'FFMPEG_EXITED') {
      //    if (queue.songs.length > 1 || queue.autoplay) {
      //       await queue.skip(); // Salta a la siguiente pista :contentReference[oaicite:6]{index=6}
      //    } else {
      //       await queue.stop(); // Detiene todo si no hay más pistas :contentReference[oaicite:7]{index=7}
      //    }
      // }

      const message = await queue.textChannel?.send({
         embeds: [embed]
      })
      if (!message) return;
      Timeout.delete(message, 10_000);

   } catch (error) {
      console.log(error);

   }
}

export const event = {
   ...options,
   execute
}

// Errores

/**
 DisTubeError [FFMPEG_EXITED]: ffmpeg exited with code 1
    at ChildProcess.<anonymous> (D:\Projects\bot-music-discord\node_modules\distube\src\core\DisTubeStream.ts:134:28)
    at ChildProcess.emit (node:events:518:28)
    at Process.ChildProcess._handle.onexit (node:internal/child_process:293:12) {
  errorCode: 'FFMPEG_EXITED'     
}
 */
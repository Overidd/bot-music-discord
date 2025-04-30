import { Events, Queue, Song } from 'distube'
import { ClientDiscord, EmdebComponent } from '../../../infrastructure/discord'


const options = {
   name: Events.ERROR,
   once: false
}

const execute = async (client: ClientDiscord, errorMessage: string, queue: Queue, song: Song) => {


   console.log(typeof errorMessage);
   if (String(errorMessage)?.includes('FFMPEG_EXITED')) {

      return await queue.textChannel?.send({
         embeds: [EmdebComponent.emdebError('❌ No es posible reproducer')]
      })
   }
   return await queue.textChannel?.send({
      embeds: [EmdebComponent.emdebError('❌ Lo siento ocurrio un error')]
   })
}

export const event = {
   ...options,
   execute
}


{
   textChannel: ` DisTubeError [FFMPEG_EXITED]: ffmpeg exited with code 1
       at ChildProcess.<anonymous> (D:\Projects\bot-music-discord\node_modules\distube\src\core\DisTubeStream.ts:134:28)     
       at ChildProcess.emit (node:events:518:28)
       at Process.ChildProcess._handle.onexit (node:internal/child_process:294:12)`;
   {
      errorCode: 'FFMPEG_EXITED'
   }

}
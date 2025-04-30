import { Events } from 'distube';
import { ClientDiscord } from '../../../infrastructure/discord';


const options = {
   name: Events.FINISH_SONG,
   once: false,
}

// Este evento se ejecuta cada vez que una cancion termina
const execute = (client: ClientDiscord, ...args: any) => {

   // const [queue] = args;
   // console.log('Evento FINISH_SONG', args);
   // queue.textChannel?.send(`⏹️ Reproducci&oacute;n finalizada una cancion`);
}

export const event = {
   ...options,
   execute
}
import { Events } from 'distube';


const options = {
   name: Events.ADD_LIST,
   once: false
}

const execute = async (client: any, ...args: any) => {

   console.log('Evento ADD_LIST', args);
   const [queue] = args

   await queue.textChannel?.send(`🎵 Agregando en una lista a la cola: **${queue.songs[queue.songs.length - 1].name}**`);

}

export const event = {
   ...options,
   execute
}
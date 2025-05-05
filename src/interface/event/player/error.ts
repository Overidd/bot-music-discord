import { Events, Queue, Song } from 'distube'
import { ClientDiscord } from '../../../infrastructure/discord'

const options = {
   name: Events.ERROR,
   once: false
}

const execute = async (client: ClientDiscord, errorMessage: string, queue: Queue, song: Song) => {
   console.log('Evento ERROR');
   console.log(errorMessage);

}

export const event = {
   ...options,
   execute
}
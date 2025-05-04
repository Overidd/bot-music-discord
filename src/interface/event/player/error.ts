import { Events, Queue, Song } from 'distube'
import { ClientDiscord, EmdebComponent } from '../../../infrastructure/discord'


const options = {
   name: Events.ERROR,
   once: false
}

const execute = async (client: ClientDiscord, errorMessage: string, queue: Queue, song: Song) => {


   try {
      console.log(errorMessage);
      
   } catch (error) {
      console.log('-------Events.ERROR-------');
   }
}

export const event = {
   ...options,
   execute
}
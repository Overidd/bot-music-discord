import { Events } from 'distube'
import { ClientDiscord } from '../../../infrastructure/discord'


const options = {
   name: Events.ERROR,
   once: false
}

const execute = async (client: ClientDiscord, textChannel: any, e: any) => {

   console.log(textChannel, e);

   if (textChannel) {
      return textChannel?.send(`**Se encontró un error:** ${e.toString().slice(0, 1974)}`)
   }
}

export const event = {
   ...options,
   execute
}
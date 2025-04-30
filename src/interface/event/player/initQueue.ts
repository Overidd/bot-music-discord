import { Events, Queue, Song } from 'distube'
import { ClientDiscord } from '../../../infrastructure/discord'
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js'


const options = {
   name: Events.INIT_QUEUE,
   once: false
}

const execute = async (client: ClientDiscord, queue: Queue, song: Song) => {

   //TODO: Podiramos obtener el idioma del servidor
   console.log('INIT_QUEUE');

}

export const event = {
   ...options,
   execute
}



import { Events, Queue } from 'distube'
import { ClientDiscord } from '../../../infrastructure/discord'
import { Message } from 'discord.js'
import { CustonInteraction } from '../../../doman/types'

const options = {
   name: 'notResult',
   once: false,
}

const execute = async (client: ClientDiscord, interaction: CustonInteraction, textChannel: any, error: any) => {

   console.log({ textChannel, error });

   if (!interaction.isChatInputCommand()) return

   await interaction.followUp({
      content: `❌ No se encontraron resultados para: **${error}**`,
      ephemeral: true
   });
}

export const event = {
   ...options,
   execute,
}

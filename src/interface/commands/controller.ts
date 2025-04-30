import { SlashCommandBuilder } from 'discord.js';
import { CustonInteraction } from '../../doman/types'
import { controlComponent } from '../../infrastructure/discord';


const options = {
   data: new SlashCommandBuilder()
      .setName('controller')
      .setDescription('Panel de control')
}


const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isChatInputCommand()) return;

   const queue = interaction?.client?.player?.getQueue(interaction.guildId!);

   const { components, embeds } = controlComponent({
      nameMusic: queue?.songs[0].name,
      duration: queue?.formattedDuration,
      currentDuration: queue?.formattedCurrentTime,
      imageMusic: queue?.songs[0].thumbnail,
      voiceChannel: queue?.voiceChannel?.name,
   })

   const sentMessage = await interaction.reply({
      embeds,
      components,
   }) as { delete: any };

   const timeout = setTimeout(() => {
      sentMessage.delete().catch(console.error);
      clearTimeout(timeout)
   }, 60 * 1000 * 7)
}


export const command = {
   ...options,
   execute
};


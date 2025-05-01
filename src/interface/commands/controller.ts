import { SlashCommandBuilder } from 'discord.js';
import { CustonInteraction } from '../../doman/types'
import { controlComponent, EmdebComponent } from '../../infrastructure/discord';


const options = {
   data: new SlashCommandBuilder()
      .setName('controller')
      .setDescription('Panel de control')
}


const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isChatInputCommand()) return;

   const queue = interaction?.client?.player?.getQueue(interaction.guildId!);

   if (!queue || !queue.playing || queue.songs.length === 0) {
      return interaction.reply({
         embeds: [EmdebComponent.emdebError('⛔ No hay música reproduciéndose.')],
         ephemeral: true
      })
   };

   const { components, embeds } = controlComponent({
      nameMusic: queue?.songs[0].name,
      duration: queue?.formattedDuration,
      currentDuration: queue?.formattedCurrentTime,
      imageMusic: queue?.songs[0].thumbnail,
      voiceChannel: queue?.voiceChannel?.name,
      quantityInQueue: String((queue?.songs.length ?? 1) - 1)
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


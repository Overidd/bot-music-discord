import { MessageFlags } from 'discord.js';
import { CustonInteraction, EventButtons } from '../../doman/types';
import { EmdebComponent } from '../../infrastructure/discord';

const options = {
   data: {
      name: EventButtons.BTN_STOP.name
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;
   if (!interaction.guildId) return;

   const queue = interaction.client.player?.getQueue(interaction.guildId);

   try {
      if (!queue || !queue.playing || queue.songs.length === 0) {
         await interaction.reply({
            embeds: [EmdebComponent.emdebError('⛔ No hay música reproduciéndose.')],
            flags: MessageFlags.Ephemeral
         });
         return;
      }

      await queue.stop(); // Detiene todo y sale del canal
      await interaction.reply({
         content: `⏹️ Música detenida ${EventButtons.BTN_STOP.emoji}`,
         flags: MessageFlags.Ephemeral
      });
   } catch (error) {
      console.error('Error al detener la música:', error);
      await interaction.reply({
         embeds: [EmdebComponent.emdebError('Ocurrió un error al detener.')],
         flags: MessageFlags.Ephemeral
      });
   }
};

export const button = {
   ...options,
   execute,
};

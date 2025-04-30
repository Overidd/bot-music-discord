import { MessageFlags } from 'discord.js';
import { CustonInteraction, EventButtons } from '../../doman/types';
import { EmdebComponent } from '../../infrastructure/discord';

const options = {
   data: {
      name: EventButtons.BTN_BACK.name,
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;
   if (!interaction.guildId) return;

   const queue = interaction.client?.player?.getQueue(interaction.guildId);

   try {
      if (!queue || !queue.playing || queue.songs.length === 0) {
         await interaction.reply({
            embeds: [EmdebComponent.emdebError('⛔ No hay música reproduciéndose.')],
            flags: MessageFlags.Ephemeral
         });
         return;
      }

      if (!queue.previousSongs || queue.previousSongs.length === 0) {
         await interaction.reply({
            embeds: [EmdebComponent.emdebError('🚫 No hay canción anterior en el historial.')],
            flags: MessageFlags.Ephemeral
         });
         return;
      }

      await queue.previous();
      await interaction.reply({
         content: `${EventButtons.BTN_BACK.emoji}`,
         flags: MessageFlags.Ephemeral
      });

   } catch (error) {
      await interaction.reply({
         embeds: [EmdebComponent.emdebError('Ocurrió un error al retroceder la música.')],
         flags: MessageFlags.Ephemeral
      });
   }
};

export const button = {
   ...options,
   execute,
};

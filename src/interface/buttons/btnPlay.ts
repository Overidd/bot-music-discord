import { MessageFlags } from 'discord.js';
import { CustonInteraction, EventButtons } from '../../doman/types';
import { EmdebComponent } from '../../infrastructure/discord';

const options = {
   data: {
      name: EventButtons.BTN_PLAY.name,
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;
   if (!interaction?.guildId) return;

   const queue = interaction.client.player?.getQueue(interaction.guildId);

   try {
      if (!queue || !queue.playing || queue.songs.length === 0) {
         await interaction.reply({
            embeds: [EmdebComponent.emdebError('⛔ No hay música reproduciéndose.')],
            flags: MessageFlags.Ephemeral
         });
         return;
      }

      if (!queue.playing || !queue.paused) {
         await interaction.reply({
            content: `\`${EventButtons.BTN_PLAY.emoji}\``,
            flags: MessageFlags.Ephemeral,
         });
         return;
      }

      await queue.resume();
      await interaction.reply({
         content: `\`${EventButtons.BTN_PLAY.emoji}\``,
         flags: MessageFlags.Ephemeral,
      });
   } catch (error) {
      await interaction.reply({
         embeds: [EmdebComponent.emdebError('Ocurrió un error.')],
         flags: MessageFlags.Ephemeral
      });
   }
};

export const button = {
   ...options,
   execute,
};

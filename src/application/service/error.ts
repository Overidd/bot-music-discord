import { Queue } from 'distube';
import { CustonError } from '../../doman/error';
import { CustonInteraction } from '../../doman/types';
import { EmbedComponent } from '../../infrastructure/discord';
import { Timeout } from '../../utils';

export class ErrorService {

   static async reply(interaction: CustonInteraction, error: Error, time: number = 2_000): Promise<void> {

      if (interaction.isButton() && interaction.isRepliable() && !interaction.replied && !interaction.deferred) return;

      if (!interaction.isButton() && !interaction.isChatInputCommand()) return;

      if (error instanceof CustonError) {
         await interaction.reply({
            embeds: [EmbedComponent.error(error.message)],
         })
         const response = await interaction.fetchReply();
         Timeout.delete(response, time)
         return;
      }
      await interaction.reply({
         embeds: [EmbedComponent.error('Error inesperado del servidor')],
      })
      const response = await interaction.fetchReply();
      Timeout.delete(response, time)
   }

   static async editReply(interaction: CustonInteraction, error: Error, time: number = 2_000): Promise<void> {
      if (interaction.isButton() && interaction.isRepliable() && !interaction.replied && !interaction.deferred) return;

      if (!interaction.isButton() && !interaction.isChatInputCommand()) return;

      if (error instanceof CustonError) {
         await interaction.editReply({
            embeds: [EmbedComponent.error(error.message)],
         })
         const response = await interaction.fetchReply();
         Timeout.delete(response, time)
         return;
      }
      await interaction.editReply({
         embeds: [EmbedComponent.error('Error inesperado del servidor')],
      })
      const response = await interaction.fetchReply();
      Timeout.delete(response, time)
   }

   static async send(queue: Queue, error: Error, time: number = 2_000): Promise<void> {
      if (error instanceof CustonError) {
         const response = await queue.textChannel?.send({
            embeds: [EmbedComponent.error(error.message)],
         })
         if (!response) return;

         Timeout.delete(response, time)
         return
      }
      const response = await queue.textChannel?.send({
         embeds: [EmbedComponent.error('Error inesperado del servidor')],
      });

      if (!response) return;
      Timeout.delete(response, time)
   }
}
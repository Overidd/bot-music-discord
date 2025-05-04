import { InteractionResponse } from 'discord.js';
import { CustonError } from '../../doman/error';
import { CustonInteraction, IMessageRespons } from '../../doman/types';
import { EmdebComponent } from '../../infrastructure/discord';

export class ErrorService {

   private static async deleteTimeout(response: IMessageRespons | InteractionResponse, time: number = 2_000): Promise<boolean> {
      return await new Promise((resolve) => {
         const timeout = setTimeout(async () => {
            response.delete().catch((error) => {
               console.log('Error al eliminar el mensaje: ', error);
            });
            resolve(true);
            clearTimeout(timeout);
         }, time);
      })
   }

   static async reply(interaction: CustonInteraction, error: Error, time: number = 2_000): Promise<void> {

      if (interaction.isRepliable() && !interaction.replied && !interaction.deferred) return;
      
      if (!interaction.isButton() && !interaction.isChatInputCommand()) return;

      if (error instanceof CustonError) {
         await interaction.reply({
            embeds: [EmdebComponent.error(error.message)],
         })
         const response = await interaction.fetchReply();
         this.deleteTimeout(response, time)
         return;
      }
      await interaction.reply({
         embeds: [EmdebComponent.error('Error inesperado')],
      })
      const response = await interaction.fetchReply();
      this.deleteTimeout(response, time)
   }
}
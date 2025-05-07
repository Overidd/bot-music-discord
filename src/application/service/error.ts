import { Queue } from 'distube';
import { Timeout } from '../../utils';
import { CustonError } from '../../doman/error';
import { CustonInteraction } from '../../doman/types';
import { EmbedComponent } from '../../infrastructure/discord';
import { PanelStatusHandler } from '../handler/controlPanel';

export class ErrorService {

   static async reply(interaction: any, error: Error, time: number = 2_000): Promise<void> {
      if (interaction.isButton() && interaction.isRepliable() && interaction.replied && interaction.deferred) return;

      if (!interaction.isButton() && !interaction.isChatInputCommand()) return;

      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      )

      const embedComponent = new EmbedComponent()
         .setLang(controlPanelStatus?.getLang ?? 'es')

      if (error instanceof CustonError) {
         await interaction.reply({
            embeds: [embedComponent.error(error.typeMessage as any)],
         })

         const response = await interaction.fetchReply();
         Timeout.delete(response, time)
         return;
      }
      await interaction.reply({
         embeds: [embedComponent.error('errro500')],
      })
      const response = await interaction.fetchReply();
      Timeout.delete(response, time)
   }

   static async editReply(interaction: CustonInteraction, error: Error, time: number = 2_000): Promise<void> {
      
      if (interaction.isButton() && interaction.isRepliable() && interaction.replied && interaction.deferred) return;

      if (!interaction.isButton() && !interaction.isChatInputCommand()) return;

      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      )
      const embedComponent = new EmbedComponent()
         .setLang(controlPanelStatus?.getLang)

      if (error instanceof CustonError) {
         await interaction.editReply({
            embeds: [embedComponent.error(error.message as any)],
         })
         const response = await interaction.fetchReply();
         Timeout.delete(response, time)
         return;
      }
      await interaction.editReply({
         embeds: [embedComponent.error('errro500')],
      })
      const response = await interaction.fetchReply();
      Timeout.delete(response, time)
   }

   static async send(queue: Queue, error: Error, time: number = 2_000): Promise<void> {

      const controlPanelStatus = PanelStatusHandler.get(
         queue.client as any,
         queue?.textChannel?.guildId!
      )

      const embedComponent = new EmbedComponent()
         .setLang(controlPanelStatus?.getLang)

      if (error instanceof CustonError) {
         const response = await queue.textChannel?.send({
            embeds: [embedComponent.error(error.message as any)],
         })
         if (!response) return;

         Timeout.delete(response, time)
         return
      }
      const response = await queue.textChannel?.send({
         embeds: [embedComponent.error('errro500')],
      });

      if (!response) return;
      Timeout.delete(response, time)
   }
}
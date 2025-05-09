import { Queue } from 'distube';
import { Timeout } from '../../utils';
import { CustonError } from '../../doman/error';
import { CustonInteraction } from '../../doman/types';
import { EmbedComponent } from '../../infrastructure/discord';
import { PanelStatusHandler } from '../handler/controlPanel';

export class ErrorService {

   static async response(interaction: CustonInteraction, error: Error, time: number = 2_000): Promise<void> {

      if (!interaction.isButton() && !interaction.isChatInputCommand()) return;
      if (!interaction.isRepliable()) return;

      try {
         const controlPanelStatus = PanelStatusHandler.get(
            interaction.client,
            interaction.guildId!
         );

         const embedComponent = new EmbedComponent()
            .setLang(controlPanelStatus?.getLang ?? 'es');

         if (error instanceof CustonError) {

            interaction.deferred && !interaction.replied && await interaction.editReply({
               embeds: [embedComponent.error(error.typeMessage as any)],
            });

            !interaction.deferred && !interaction.replied && await interaction.reply({
               embeds: [embedComponent.error(error.typeMessage as any)],
            });

         } else {
            interaction.deferred && !interaction.replied && await interaction.editReply({
               embeds: [embedComponent.error('errro500')],
            });

            !interaction.deferred && !interaction.replied && await interaction.reply({
               embeds: [embedComponent.error('errro500')],
            });
         }

         if (interaction.replied || interaction.deferred) {
            const fetchedResponse = await interaction.fetchReply();
            Timeout.delete(fetchedResponse, time);
         }

      } catch (error) {
         console.error(error);
      }
   }

   static async send(queue: Queue, error: Error, time: number = 2_000): Promise<void> {
      try {
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
      } catch (error) {
         console.log(error);
      }
   }
}
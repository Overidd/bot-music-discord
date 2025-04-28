import { BaseInteractionHandler } from '../../../doman/handler';
import { CustonInteraction } from '../../../doman/types';

export class GuildHandler extends BaseInteractionHandler {

   override async handle(interaction: CustonInteraction, dataChannel: object): Promise<void> {

      if (!interaction.guild) {

         if (interaction.isChatInputCommand()) {
            interaction.editReply({
               content: 'El bot solo funciona en servidores'
            })
         };

         return;
      }

      await super.handle(interaction, dataChannel)
   }
}
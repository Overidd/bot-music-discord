import { ErrorService } from '../../application/service';
import { CustonInteraction, EventButtons } from '../../doman/types';

const options = {
   data: {
      name: EventButtons.BTN_PLAYLIST
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {

      interaction.reply('En desarrollo xd')

   } catch (error) {
      ErrorService.response(interaction, error as Error)
   }

}

export const button = {
   ...options,
   execute
}

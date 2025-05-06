import { CustonInteraction, EventButtons } from '../../doman/types';
import { ErrorService, SongService } from '../../application/service';

const options = {
   data: {
      name: EventButtons.BTN_SKIP,
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) throw Error;

   try {
      await SongService.getInstance()
         .skip(interaction);

      await interaction.deferUpdate();

   } catch (error) {
      ErrorService.reply(interaction, error as Error)
   }
};

export const button = {
   ...options,
   execute,
}; 
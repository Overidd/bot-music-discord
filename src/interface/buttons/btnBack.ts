import { CustonInteraction, EventButtons } from '../../doman/types';
import { ErrorService, SongService } from '../../application/service';

const options = {
   data: {
      name: EventButtons.BTN_BACK.name,
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {
      await SongService.getInstance()
         .back(interaction);

   } catch (error) {
      ErrorService.reply(interaction, error as Error)
   }
};

export const button = {
   ...options,
   execute,
};
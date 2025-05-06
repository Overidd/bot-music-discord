import { CustonInteraction, EventButtons } from '../../doman/types';
import { ErrorService, SongService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';

const options = {
   data: {
      name: EventButtons.BTN_STOP
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {
      await SongService.getInstance()
         .stop(interaction);

      PanelStatusHandler.delete(interaction.client, interaction.guildId!)

      await interaction.deferUpdate();
   } catch (error) {
      ErrorService.reply(interaction, error as Error)
   }
};

export const button = {
   ...options,
   execute,
};

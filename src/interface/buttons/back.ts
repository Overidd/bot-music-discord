import { CustonInteraction, EventButtons } from '../../doman/types';
import { ErrorService, SongService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';

const options = {
   data: {
      name: EventButtons.BTN_BACK,
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) throw Error;

   try {
      await SongService.getInstance()
         .back(interaction);

      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      )

      await interaction.deferReply();
      await controlPanelStatus?.deleteRespon()
      controlPanelStatus?.setBtnBackInteraction(interaction)

   } catch (error) {
      ErrorService.response(interaction, error as Error)
   }
};

export const button = {
   ...options,
   execute,
};
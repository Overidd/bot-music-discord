import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';

const options = {
   data: {
      name: EventButtons.BTN_STOP.name
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   const res = await SongService.getInstance()
      .stop(interaction);

   if (!res) return;

   PanelStatusHandler.delete(interaction.client, interaction.guildId!)

   interaction.reply({
      ...res.message,
   });
};

export const button = {
   ...options,
   execute,
};

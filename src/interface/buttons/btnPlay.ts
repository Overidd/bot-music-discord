import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';
import { PanelStatusComponent } from '../../infrastructure/discord';

const options = {
   data: {
      name: EventButtons.BTN_PLAY.name,
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {
      const res = await SongService.getInstance()
         .play(interaction);

      if (!res) return;

      const { controlPanel } = PanelStatusHandler.edit(
         interaction.client,
         interaction.guildId!
      )

      const buttonsWitRows = new PanelStatusComponent()
         .buttons.from(controlPanel?.components || [])
         .updateToPause()
         .buildRows()

      await controlPanel.edit({
         embeds: controlPanel.embeds,
         components: buttonsWitRows,
      })

      await interaction.reply({
         ...res.message,
      });
   } catch (error) {
      console.log(error);
   }
};

export const button = {
   ...options,
   execute,
};

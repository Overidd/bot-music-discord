import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { ControlPanelStatus } from '../../application/handler/controlPanel';
import { ControlComponent } from '../../infrastructure/discord';

const options = {
   data: {
      name: EventButtons.BTN_PLAY.name,
   }
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   const res = await SongService.getInstance()
      .play(interaction);

   if (!res) return;

   const control = ControlPanelStatus.edit(interaction.client, interaction.guildId!)

   const row1 = ControlComponent.updateToPause(control?.controlPanel?.components[0].components || [])
   const row2 = ControlComponent.updateToButtons(control?.controlPanel?.components[1].components || [])

   console.log('BTN_PLAY', row1, row2);
   control?.controlPanel.edit({
      embeds: control?.controlPanel.embeds,
      components: [row1, row2],
   })


   interaction.reply({
      ...res.message,
   });
};

export const button = {
   ...options,
   execute,
};

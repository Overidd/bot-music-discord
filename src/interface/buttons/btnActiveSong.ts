import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { ControlComponent } from '../../infrastructure/discord';
import { ControlPanelStatus } from '../../application/handler/controlPanel';

const options = {
   data: {
      name: EventButtons.BTN_ACTIVESONG.name,
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   const res = await SongService.getInstance()
      .activeMusic(interaction);

   if (!res) return;

   const control = ControlPanelStatus.edit(interaction.client, interaction.guildId!)

   const row1 = ControlComponent.buildRows(control?.controlPanel?.components[0].components || [])
   const row2 = ControlComponent.updateToMuteSong(control?.controlPanel?.components[1].components || [])

   control?.controlPanel.edit({
      embeds: control?.controlPanel.embeds,
      components: [...row1, row2]
   })

   interaction.reply({
      ...res.message,
   });
}

export const button = {
   ...options,
   execute,
}
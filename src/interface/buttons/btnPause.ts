import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { ControlPanelStatus } from '../../application/handler/controlPanel';
import { ControlComponent, EmdebComponent } from '../../infrastructure/discord';


const options = {
   data: {
      name: EventButtons.BTN_PAUSE.name,
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {
      const res = await SongService.getInstance()
         .pause(interaction);

      if (!res) return;

      const control = ControlPanelStatus.edit(interaction.client, interaction.guildId!)

      const row1 = ControlComponent.updateToPlaying(control?.controlPanel?.components[0].components || [])
      const row2 = ControlComponent.updateToButtons(control?.controlPanel?.components[1].components || [])

      console.log('BTN_PAUSE',row1, row2);
      control?.controlPanel.edit({
         embeds: control?.controlPanel.embeds,
         components: [row1, row2]
      })

      await interaction.reply({
         ...res.message,
      });

   } catch (error) {
      const sentMessage = await interaction.reply({
         embeds: [EmdebComponent.emdebError('❌ Lo siento ocurrio un error')]
      }) as { delete: any };

      const timeout = setTimeout(() => {
         sentMessage.delete().catch(console.error);
         clearTimeout(timeout)
      }, 5000);
   }
}

export const button = {
   ...options,
   execute,
}


import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';
import { PanelStatusComponent, EmdebComponent } from '../../infrastructure/discord';

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

      const { controlPanel } = PanelStatusHandler.edit(
         interaction.client,
         interaction.guildId!
      )

      const buttonsWitRows = new PanelStatusComponent()
         .buttons.from(controlPanel?.components || [])
         .updateToPlaying()
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
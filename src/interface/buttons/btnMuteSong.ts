import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';
import { PanelStatusComponent } from '../../infrastructure/discord';

const options = {
   data: {
      name: EventButtons.BTN_MUTESONG.name,
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {
      const res = await SongService.getInstance()
         .muteMusic(interaction);

      if (!res) return;

      const { controlPanel } = PanelStatusHandler.edit(
         interaction.client,
         interaction.guildId!
      )

      const panelControlComponent = new PanelStatusComponent()

      const embed = panelControlComponent
         .embed.from(controlPanel.embeds[0])
         .bodyUpdate({ volumen: String(0) })
         .build()
      const components = panelControlComponent
         .buttons.from(controlPanel.components || [])
         .updateToActiveSong()
         .buildRows()

      await controlPanel.edit({
         embeds: [embed],
         components: components,
      })

      interaction.reply({
         ...res.message,
      });

   } catch (error) {
      console.log(error);
   }
}

export const button = {
   ...options,
   execute,
}

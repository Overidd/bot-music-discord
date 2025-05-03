import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';
import { PanelStatusComponent } from '../../infrastructure/discord';
import { PanelStatusHandler } from '../../application/handler/controlPanel';

const options = {
   data: {
      name: EventButtons.BTN_ACTIVESONG.name,
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {
      const res = await SongService.getInstance()
         .activeMusic(interaction);

      if (!res) return;

      const { controlPanel, volumen } = PanelStatusHandler.edit(
         interaction.client,
         interaction.guildId!
      )
      const panelControlComponent = new PanelStatusComponent()

      const embed = panelControlComponent
         .embed.from(controlPanel.embeds[0])
         .bodyUpdate({ volumen: String(volumen ?? 50) })
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
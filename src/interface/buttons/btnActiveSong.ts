import { CustonInteraction, EventButtons } from '../../doman/types';
import { ErrorService, SongService } from '../../application/service';
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
      const { controlPanel, volumen } = PanelStatusHandler.edit(
         interaction.client,
         interaction.guildId!
      )

      const panelControlComponent = new PanelStatusComponent()

      const embed = panelControlComponent
         .embed.from(controlPanel.embeds[0])
         .bodyUpdate({ volumen: String(volumen ?? 50) })
         .footerUpdate({
            text: `Activado por ${interaction.user.username}`,
            iconUser: interaction.user.displayAvatarURL(),
         })
         .build()

      const queue = interaction.client.player?.getQueue(interaction.guildId!)
      if (!queue) throw Error;

      const components = panelControlComponent.buttons.create({
         isActiveSong: queue?.volume > 0,
         isPlaying: queue?.playing && !queue?.paused,
         isActiveLoop: queue?.repeatMode === 2,
      }).buildRows()

      await SongService.getInstance()
         .activeMusic(interaction);

      await controlPanel.edit({
         embeds: [embed],
         components: components,
      })

      await interaction.deferUpdate();

   } catch (error) {
      ErrorService.reply(interaction, error as Error)
   }
}

export const button = {
   ...options,
   execute,
}
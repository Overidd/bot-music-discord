import { CustonInteraction, EventButtons } from '../../doman/types';
import { ErrorService, SongService } from '../../application/service';
import { PanelStatusComponent } from '../../infrastructure/discord';
import { PanelStatusHandler } from '../../application/handler/controlPanel';

const options = {
   data: {
      name: EventButtons.BTN_LOOPDISACTIVE,
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   try {
      await SongService.getInstance()
         .activeLoopMusic(interaction);

      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      )

      if (!controlPanelStatus) throw Error;

      const embed = new PanelStatusComponent.Embed()
         .setLang(controlPanelStatus.getLang)
         .from(controlPanelStatus.getRespon!.embeds[0])
         .footerUpdate({
            text: `${interaction.user.username}`,
            iconUser: interaction.user.displayAvatarURL(),
            textAction: 'actionLoopActive'
         }).build()

      const queue = interaction.client.player?.getQueue(interaction.guildId!)
      if (!queue) throw Error;

      const components = new PanelStatusComponent.Buttons()
         .setLang(controlPanelStatus.getLang)
         .create({
            isActiveSong: queue?.volume > 0,
            isPlaying: queue?.playing && !queue?.paused,
            isActiveLoop: queue?.repeatMode === 2,
         }).buildRows()

      await controlPanelStatus.getRespon?.edit({
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
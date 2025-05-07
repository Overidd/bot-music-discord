import { SlashCommandBuilder } from 'discord.js';
import { CustonError } from '../../doman/error';
import { CustonInteraction } from '../../doman/types'
import { ErrorService } from '../../application/service';
import { PanelStatusComponent } from '../../infrastructure/discord';
import { PanelStatusHandler } from '../../application/handler/controlPanel';

const options = {
   data: new SlashCommandBuilder()
      .setName('controller')
      .setDescription('Panel de control')
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isChatInputCommand()) return;

   try {
      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      )

      if (!controlPanelStatus) throw Error;

      const queue = interaction?.client?.player?.getQueue(interaction.guildId!);

      if (!queue || !queue.playing || queue.songs.length === 0) {
         throw CustonError.validation('errorNotPlaying')
      };

      const embed = new PanelStatusComponent.Embed()
         .setLang(controlPanelStatus.getLang)
         .create()
         .header({
            imageMusic: queue?.songs[0].thumbnail,
            nameMusic: queue?.songs[0].name,
            nameSourceMusic: queue?.songs[0].source,
            urlMusic: queue?.songs[0].url
         })
         .body({
            duration: queue?.formattedDuration,
            quantityInQueue: String(queue.songs.length),
            volume: String(queue.volume),
         })
         .footer({
            text: '\u00A0',
            iconUser: 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746313476/qukbvlboemwfpgxgdd5s.gif',
         })
         .build()

      const components = new PanelStatusComponent.Buttons()
         .setLang(controlPanelStatus.getLang)
         .create({
            isActiveSong: queue?.volume > 0,
            isPlaying: queue?.playing && !queue?.paused,
            isActiveLoop: queue?.repeatMode === 2,
         }).buildRows()

      await interaction.reply({
         embeds: [embed],
         components: components,
      });

      controlPanelStatus.setterRespon = await interaction.fetchReply();

   } catch (error) {
      ErrorService.reply(interaction, error as Error)
   }
}

export const command = {
   ...options,
   execute
};
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
      const queue = interaction?.client?.player?.getQueue(interaction.guildId!);

      if (!queue || !queue.playing || queue.songs.length === 0) {
         throw CustonError.validation('⛔ No hay música reproduciéndose.')
      };

      const panelControlComponent = new PanelStatusComponent()
      const embed = panelControlComponent.embed.create()
         .header({
            imageMusic: queue?.songs[0].thumbnail,
            nameMusic: queue?.songs[0].name,
            nameSourceMusic: queue?.songs[0].source,
            urlMusic: queue?.songs[0].url
         })
         .body({
            duration: queue?.formattedDuration,
            quantityInQueue: String(queue.songs.length),
            volumen: String(queue.volume),
         })
         .footer({
            text: `\`\``,
            iconUser: 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746313476/qukbvlboemwfpgxgdd5s.gif'
         })
         .build()


      const components = panelControlComponent.buttons.create({
         isActiveSong: queue?.volume > 0,
         isPlaying: queue?.playing && !queue?.paused,
         isActiveLoop: queue?.repeatMode === 2,
      }).buildRows()

      await interaction.reply({
         embeds: [embed],
         components: components,
      });
      const sentMessage = await interaction.fetchReply();
      PanelStatusHandler.delete(interaction.client, queue.textChannel?.guildId!)

      PanelStatusHandler.create(interaction.client, {
         guildId: queue.textChannel?.guildId!,
         controlPanel: sentMessage as any
      })

   } catch (error) {
      ErrorService.reply(interaction, error as Error)
   }
}


export const command = {
   ...options,
   execute
};


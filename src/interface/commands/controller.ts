import { SlashCommandBuilder } from 'discord.js';
import { CustonInteraction } from '../../doman/types'
import { PanelStatusComponent, EmdebComponent } from '../../infrastructure/discord';
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
         return interaction.reply({
            embeds: [EmdebComponent.emdebError('⛔ No hay música reproduciéndose.')],
            ephemeral: true
         })
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
         .build()

      const components = panelControlComponent.buttons.create({
         isActiveSong: queue?.volume > 0,
         isMuteSong: queue?.volume === 0,
         isPaused: queue?.paused,
         isPlaying: queue?.playing && !queue?.paused,
      }).buildRows()

      const sentMessage = await interaction.reply({
         embeds: [embed],
         components: components,
         fetchReply: true,
      });

      PanelStatusHandler.delete(interaction.client, queue.textChannel?.guildId!)

      PanelStatusHandler.create(interaction.client, {
         guildId: queue.textChannel?.guildId!,
         controlPanel: sentMessage as any
      })

   } catch (error) {

   }

}


export const command = {
   ...options,
   execute
};


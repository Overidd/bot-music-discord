import { SlashCommandBuilder } from "discord.js";
import { CustonInteraction } from "../../doman/types";
import { ErrorService, SongService } from "../../application/service";
import { EmbedComponent, PanelStatusComponent } from "../../infrastructure/discord";
import { Timeout } from "../../utils";
import { PanelStatusHandler } from "../../application/handler/controlPanel";


const options = {
   data: new SlashCommandBuilder()
      .setName('volume')
      .setDescription('Controla el volumen')
      .addIntegerOption(option =>
         option.setName('number')
            .setDescription('Controla el volumen')
            .setRequired(true)
            .setMinValue(0)
            .setMaxValue(100)
      )
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isChatInputCommand()) return;

   try {
      const levelVolume = interaction.options.getInteger('number')

      if (!levelVolume) throw Error;

      await new SongService()
         .setVolumen(interaction, levelVolume)

      const panelStatusHandler = PanelStatusHandler.edit(
         interaction.client,
         interaction.guildId!
      );

      if (panelStatusHandler?.controlPanel) {
         panelStatusHandler.volumen = levelVolume

         const panelControlComponent = new PanelStatusComponent()

         const embed = panelControlComponent.embed.from(panelStatusHandler.controlPanel.embeds[0])
            .bodyUpdate({
               volumen: String(levelVolume)
            })
            .build();

         const queue = interaction?.client?.player?.getQueue(interaction.guildId!);

         const components = panelControlComponent.buttons.create({
            isActiveSong: levelVolume > 0,
            isPlaying: queue?.playing && !queue?.paused ? true : false,
            isActiveLoop: queue?.repeatMode === 2,
         }).buildRows()

         await panelStatusHandler.controlPanel.edit({
            embeds: [embed],
            components: components,
         });
      }

      await interaction.reply({
         embeds: [EmbedComponent.settingVolumen(`Volumen ajustado: **[${levelVolume}]**%`)]
      })
      const response = await interaction.fetchReply()
      Timeout.delete(response, 15_000);

   } catch (error) {
      await ErrorService.reply(interaction, error as Error)
   }
}

export const command = {
   ...options,
   execute
}
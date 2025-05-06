import { Timeout } from '../../utils';
import { SlashCommandBuilder } from 'discord.js';
import { CustonError } from '../../doman/error';
import { CustonInteraction } from '../../doman/types';
import { PanelStatusHandler } from '../../application/handler/controlPanel';
import { ErrorService, SongService } from '../../application/service';
import { EmbedComponent, PanelStatusComponent } from '../../infrastructure/discord';


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
      const levelVolume = interaction.options.getInteger('number') ?? 50;

      const queue = interaction?.client?.player?.getQueue(interaction.guildId!);

      if (!queue || !queue.playing || queue.songs.length === 0) {
         throw CustonError.validation('No hay música reproduciéndose.')
      };

      await new SongService()
         .setVolumen(interaction, levelVolume)

      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      )

      if (!controlPanelStatus) throw Error;

      controlPanelStatus.setValume(queue.volume) 

      const embed = new PanelStatusComponent.Embed()
         .setLang(controlPanelStatus.getLang)
         .from(controlPanelStatus.getRespon!.embeds[0])
         .bodyUpdate({
            volumen: String(levelVolume)
         })
         .build();

      const components = new PanelStatusComponent.Buttons()
         .setLang(controlPanelStatus.getLang)
         .create({
            isActiveSong: levelVolume > 0,
            isPlaying: queue?.playing && !queue?.paused ? true : false,
            isActiveLoop: queue?.repeatMode === 2,
         }).buildRows()

      await controlPanelStatus.getRespon?.edit({
         embeds: [embed],
         components: components,
      });

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
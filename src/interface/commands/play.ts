import { Timeout } from '../../utils';
import { CustonInteraction } from '../../doman/types';
import { ErrorService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';
import { SlashCommandBuilder, GuildTextBasedChannel, MessageFlags } from 'discord.js';
import { EmbedComponent, FoundComponent, PanelStatusComponent } from '../../infrastructure/discord';

const options = {
   data: new SlashCommandBuilder()
      .setName('play')
      .setDescription('Musica de YouTube, Spotify')
      .addStringOption(option =>
         option.setName('query')
            .setDescription('Musica de YouTube, Spotify')
            .setRequired(true)
      ),
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isChatInputCommand()) return;

   const voiceChannel = interaction.member.voice.channel;

   if (!voiceChannel) {
      return interaction.reply({
         embeds: [EmbedComponent.warning('Debes estar en un canal de voz para usar este comando')],
         flags: MessageFlags.Ephemeral
      });
   }

   const query = interaction.options.getString('query')?.replace(/\(.*?\)|\[.*?\]/g, '').trim();

   //TODO: Haria falta de validar el query si es de tipo url o spotify o youtube y si es un nombre
   if (!query) {
      return interaction.reply({
         embeds: [EmbedComponent.warning('Por favor escribe un nombre de música')],
         flags: MessageFlags.Ephemeral
      });
   }

   const textChannel = interaction.channel as GuildTextBasedChannel | null;

   if (!textChannel) {
      return interaction.reply({
         embeds: [EmbedComponent.warning('No se pudo encontrar un canal de texto.')],
         flags: MessageFlags.Ephemeral
      });
   }

   try {
      interaction.deferReply();

      await interaction.client.player!.playWithTimeout(
         voiceChannel as any,
         query, {
         member: interaction.member,
         textChannel: textChannel as any,
         metadata: interaction,
      });

      console.log('Play');

      const queue = interaction.client.player?.getQueue
         (interaction.guildId!);

      const panelStatusHandler = PanelStatusHandler.edit(
         interaction.client,
         interaction.guildId!
      );

      if (panelStatusHandler?.controlPanel) {
         const embedComponent = new PanelStatusComponent()
            .embed.from(panelStatusHandler.controlPanel.embeds[0])
            .bodyUpdate({
               quantityInQueue: String(queue?.songs.length),
            })
            .build();

         await panelStatusHandler.controlPanel.edit({
            embeds: [embedComponent],
            components: panelStatusHandler.controlPanel.components,
         });
      }

      const embed = new FoundComponent()
         .header({
            imageMusic: queue?.songs.at(-1)?.thumbnail,
            nameMusic: queue?.songs.at(-1)?.name!,
         })
         .body({
            autor: queue?.songs.at(-1)?.uploader.name,
            duration: String(queue?.songs.at(-1)?.formattedDuration),
            source: queue?.songs.at(-1)?.source,
         })
         .build();

      await interaction.editReply({
         embeds: [embed],
      });

      const response = await interaction.fetchReply()
      Timeout.delete(response, 15_000);

   } catch (error) {
      console.error(error);
      // if (error instanceof DisTubeError && error?.errorCode === 'NO_RESULT') {

      //    interaction.client.player?.emit('notResult' as any, interaction, textChannel, error);
      //    return
      // }
      ErrorService.editReply(interaction, error as Error)
   }
};

export const command = {
   ...options,
   execute
};
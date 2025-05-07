import { Timeout } from '../../utils';
import { CustonInteraction } from '../../doman/types';
import { PanelStatusHandler } from '../../application/handler/controlPanel';
import { ErrorService, LangService } from '../../application/service';
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
   let lang;

   try {
      interaction.deferReply();

      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      );

      if (!controlPanelStatus) {
         lang = LangService.get(interaction.guildId!)
      }

      const embedComponent = new EmbedComponent()
         .setLang(controlPanelStatus?.getLang ?? lang)

      if (!voiceChannel) {
         return interaction.reply({
            embeds: [embedComponent.warning('warningHasVoiceChannel')],
            flags: MessageFlags.Ephemeral
         });
      }

      const query = interaction.options.getString('query')?.replace(/\(.*?\)|\[.*?\]/g, '').trim();

      //TODO: Haria falta de validar el query si es de tipo url o spotify o youtube y si es un nombre
      if (!query) {
         return interaction.reply({
            embeds: [embedComponent.warning('warningHasWriteTheNameMusic')],
            flags: MessageFlags.Ephemeral
         });
      }

      const textChannel = interaction.channel as GuildTextBasedChannel | null;

      if (!textChannel) {
         return interaction.reply({
            embeds: [embedComponent.warning('warningNotTextChannel')],
            flags: MessageFlags.Ephemeral
         });
      }

      await interaction.client.player!.playWithTimeout(
         voiceChannel as any,
         query, {
         member: interaction.member,
         textChannel: textChannel as any,
         metadata: interaction,
      });

      console.log('Play');

      const queue = interaction.client.player?.getQueue(interaction.guildId!);

      if (controlPanelStatus) {
         const embed = new PanelStatusComponent.Embed()
            .setLang(controlPanelStatus.getLang)
            .from(controlPanelStatus.getRespon!.embeds[0])
            .bodyUpdate({
               quantityInQueue: String(queue?.songs.length),
            })
            .build();

         await controlPanelStatus.getRespon?.edit({
            embeds: [embed],
            components: controlPanelStatus.getRespon.components,
         });
      }

      const embed = new FoundComponent()
         .setLang(controlPanelStatus?.getLang ?? lang ?? 'es')
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
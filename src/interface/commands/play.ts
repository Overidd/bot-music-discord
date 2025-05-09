import { Timeout } from '../../utils';
import { CustonError } from '../../doman/error';
import { CustonInteraction } from '../../doman/types';
import { PanelStatusHandler } from '../../application/handler/controlPanel';
import { ErrorService, LangService } from '../../application/service';
import { SlashCommandBuilder, GuildTextBasedChannel } from 'discord.js';
import { FoundComponent, PanelStatusComponent } from '../../infrastructure/discord';

const options = {
   data: new SlashCommandBuilder()
      .setName('play')
      .setDescription('Musica de YouTube, Spotify')
      .addStringOption(option =>
         option.setName('query')
            .setDescription('Busca por el nombre o url')
            .setRequired(true)
      ),
};

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isChatInputCommand()) return;

   const voiceChannel = interaction.member.voice.channel;
   let lang;
   try {

      const controlPanelStatus = PanelStatusHandler.get(
         interaction.client,
         interaction.guildId!
      );

      if (!controlPanelStatus) {
         lang = LangService.get(interaction.guildId!)
      }

      if (!voiceChannel) throw CustonError.validation('errorHasVoiceChannel');

      const query = interaction.options.getString('query')?.replace(/\(.*?\)|\[.*?\]/g, '').trim();
      //TODO: Haria falta de validar el query si es de tipo url o spotify o youtube y si es un nombre

      if (!query) throw CustonError.validation('errorHasWriteTheNameMusic');

      const textChannel = interaction.channel as GuildTextBasedChannel | null;

      if (!textChannel) throw CustonError.validation('errorNotTextChannel');

      await interaction.deferReply();

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

      if ((queue?.songs.length ?? 0) > 1) {
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
      } else {
         interaction.deleteReply()
      }


   } catch (error) {
      // if (error instanceof DisTubeError && error?.errorCode === 'NO_RESULT') {

      //    interaction.client.player?.emit('notResult' as any, interaction, textChannel, error);
      //    return
      // }
      ErrorService.response(interaction, error as Error)
   }
};

export const command = {
   ...options,
   execute
};
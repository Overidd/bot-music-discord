import { Timeout } from '../../utils';
import { ErrorService } from '../../application/service';
import { CustonInteraction } from '../../doman/types';
import { EmbedComponent } from '../../infrastructure/discord';
import { SlashCommandBuilder, GuildTextBasedChannel } from 'discord.js';

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
         embeds: [EmbedComponent.warning('Debes estar en un canal de voz para usar este comando')]
      });
   }

   const query = interaction.options.getString('query')?.replace(/\(.*?\)|\[.*?\]/g, '').trim();

   //TODO: Haria falta de validar el query si es de tipo url o spotify o youtube y si es un nombre
   if (!query) {
      return interaction.reply({
         embeds: [EmbedComponent.warning('Por favor escribe un nombre de música')]
      });
   }

   interaction.deferReply();

   const textChannel = interaction.channel as GuildTextBasedChannel | null;

   if (!textChannel) {
      return interaction.reply({
         embeds: [EmbedComponent.warning('No se pudo encontrar un canal de texto.')]
      });
   }

   try {
      const playPromise = await interaction.client.player!.playWithTimeout(
         voiceChannel as any,
         query,
         {
            member: interaction.member,
            textChannel: textChannel as any,
            metadata: interaction,
         }
      );

      console.log({ playPromise });

      const queue = interaction.client.player?.getQueue(interaction.guildId!);
      await interaction.editReply({
         embeds: [EmbedComponent.success(`Agregado: ${queue?.songs.at(-1)?.name} ⏱️[${queue?.songs.at(-1)?.formattedDuration}]`)],
      });

      const response = await interaction.fetchReply()
      Timeout.delete(response, 5_000)

   } catch (error) {
      console.error(error);

      // if (error instanceof DisTubeError && error?.errorCode === 'NO_RESULT') {

      //    interaction.client.player?.emit('notResult' as any, interaction, textChannel, error);
      //    return
      // }
      ErrorService.reply(interaction, error as Error)
   }
};

export const command = {
   ...options,
   execute
};
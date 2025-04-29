import { SlashCommandBuilder, GuildMember, GuildTextBasedChannel } from 'discord.js';
import { CustonInteraction } from '../../doman/types';
import { getVoiceConnection } from '@discordjs/voice';

const options = {
   data: new SlashCommandBuilder()
      .setName('play')
      .setDescription('Reproduce música de YouTube')
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
      return interaction.reply('¡Debes estar en un canal de voz para usar este comando!');
   }

   const existingConnection = getVoiceConnection(interaction.guildId!);
   if (existingConnection) existingConnection.destroy();

   const query = interaction.options.getString('query');

   await interaction.deferReply();
   await interaction.editReply('Buscando música...');

   if (!query) {
      return interaction.editReply('Por favor escribe un nombre de música');
   }

   const textChannel = interaction.channel as GuildTextBasedChannel | null;

   if (!textChannel) {
      return interaction.editReply('No se pudo encontrar un canal de texto.');
   }

   try {
      await interaction.client.player?.play(
         voiceChannel,
         query!, {
         member: interaction.member,
         textChannel: textChannel,
      });

      interaction.editReply('Reproduciendo música');

   } catch (error) {
      console.error(error);
      interaction.editReply('Ocurrió un error');
   }
};

export const command = {
   ...options,
   execute
};

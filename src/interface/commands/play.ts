import { SlashCommandBuilder, GuildMember, GuildTextBasedChannel, EmbedBuilder, MessageFlags } from 'discord.js';
import { CustonInteraction } from '../../doman/types';
import { getVoiceConnection } from '@discordjs/voice';
import { DisTubeError } from 'distube';

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
      return interaction.reply('¡Debes estar en un canal de voz para usar este comando!');
   }

   const existingConnection = getVoiceConnection(interaction.guildId!);

   if (existingConnection) existingConnection.destroy();

   const query = interaction.options.getString('query')?.replace(/\(.*?\)|\[.*?\]/g, '').trim();

   //TODO: Haria falta de validar el query si es de tipo url o spotify o youtube y si es un nombre
   if (!query) {
      return interaction.editReply('Por favor escribe un nombre de música');
   }

   await interaction.deferReply({ ephemeral: true });

   const isQueue = interaction.client.player?.queues.has(interaction.guildId!);

   const queue = interaction.client.player?.queues.get(interaction.guildId!);

   console.log({ isQueue, queue });

   let embed: EmbedBuilder | undefined;

   if (!isQueue && !queue?.playing) {
      embed = new EmbedBuilder()
         .setAuthor({
            name: interaction.user.globalName || interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
         })

         .setColor('#0099ff')
         .setDescription(`\`Vamos a ponerle ritmo a esto: 🔎 buscando\``)
   } else {
      // Componente Embeds
      embed = new EmbedBuilder()
         .setAuthor({
            name: interaction.user.globalName || interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
         })
         .setColor('#0099ff')
         .setDescription(`\`Que siga sonado: 🔎 buscando\``)
   }

   await interaction.editReply({
      embeds: [embed],
   });

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

      const queue = interaction?.client?.player?.getQueue(interaction.guildId!);

      embed = new EmbedBuilder()
         .setAuthor({
            name: interaction.user.globalName || interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
         })
         .setColor('#0099ff')
         .setDescription(`Musica encontrada: \`${queue?.songs.at(-1)?.name}\` ⏱️ [${queue?.songs.at(-1)?.formattedDuration}]`)

      await interaction.editReply({
         embeds: [embed],
      })

   } catch (error) {
      console.error(error);

      if (error instanceof DisTubeError && error?.errorCode === 'NO_RESULT') {

         // interaction.editReply(`❌ No se encontraron resultados para: **${query}**`);
         interaction.client.player?.emit('notResult' as any, interaction, textChannel, error);
         return
      }
      interaction.editReply('Ocurrió un error');
   }
};

export const command = {
   ...options,
   execute
};
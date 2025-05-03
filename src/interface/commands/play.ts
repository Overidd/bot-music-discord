import { SlashCommandBuilder, GuildTextBasedChannel, EmbedBuilder, MessageFlags } from 'discord.js';
import { CustonInteraction } from '../../doman/types';
import { DisTubeError } from 'distube';
import { EmdebComponent } from '../../infrastructure/discord';

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

   // const existingConnection = getVoiceConnection(interaction.guildId!);

   // if (existingConnection) existingConnection.destroy();

   const query = interaction.options.getString('query')?.replace(/\(.*?\)|\[.*?\]/g, '').trim();

   //TODO: Haria falta de validar el query si es de tipo url o spotify o youtube y si es un nombre
   if (!query) {
      return interaction.editReply('Por favor escribe un nombre de música');
   }

   await interaction.deferReply({
      flags: MessageFlags.Ephemeral  // ✅ correcta forma moderna
   });

   const textChannel = interaction.channel as GuildTextBasedChannel | null;

   if (!textChannel) {
      return interaction.editReply('No se pudo encontrar un canal de texto.');
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

      const queue = interaction.client.player?.getQueue(interaction.guildId!);

      console.log({ playPromise });

      const embed = new EmbedBuilder()
         .setAuthor({
            name: interaction.user.globalName || interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
         })
         .setColor('#0099ff')
         .setDescription(`🎶 Música encontrada: \`${queue?.songs.at(-1)?.name}\` ⏱️ [${queue?.songs.at(-1)?.formattedDuration}]`);

      await interaction.editReply({
         embeds: [embed],
      });


   } catch (error) {
      console.error(error);
      if (error instanceof DisTubeError && error?.errorCode === 'NO_RESULT') {

         interaction.client.player?.emit('notResult' as any, interaction, textChannel, error);
         return
      }
      interaction.editReply({
         embeds: [EmdebComponent.emdebError(`❌ Ocurrió un error al buscar la música`)],
      });
   }
};

export const command = {
   ...options,
   execute
};



// import { getPlaylist } from 'spotify-url-info'; // usa CommonJS si lo necesitas
// import fetch from 'node-fetch';

// // Requerido por spotify-url-info
// const spotifyClient = getPlaylist(fetch);

// async function validarYReproducir(interaction, url: string) {
//    try {
//       // Si es un link de Spotify playlist
//       if (url.includes('spotify.com/playlist')) {
//          const data = await spotifyClient(url);

//          if (data?.tracks?.length > 100) {
//             return interaction.reply('⚠️ La playlist tiene más de 100 canciones y no puede ser reproducida.');
//          }
//       }

//       // Si pasa la validación, reproducimos normalmente
//       distube.play(interaction.member.voice.channel, url, {
//          textChannel: interaction.channel,
//          member: interaction.member,
//       });

//    } catch (err) {
//       console.error('Error validando playlist:', err);
//       interaction.reply('❌ Ocurrió un error al validar la playlist.');
//    }
// }


const playWithTimeout = async () => {

   // // 1. Creamos un timeout que rechaza en 20 s
   // const timeoutPromise = new Promise<never>((_, reject) =>
   //    setTimeout(() => reject(new Error('TIMEOUT_NO_RESULT')), 20_000)
   // );

   // // 2. Promise.race para ver cuál termina primero
   // try {
   //    await Promise.race([playPromise, timeoutPromise]);
   //    // Si llegamos aquí, play() arrancó correctamente
   // } catch (err) {
   //    // Si vence el timeout o hay error, destruimos la conexión
   //    const conn = getVoiceConnection(interaction.guildId!);
   //    if (conn) conn.destroy(); // desconecta y limpia :contentReference[oaicite:1]{index=1}
   //    // Opcional: limpia la cola de Distube
   //    interaction.client.player!.stop(interaction.guildId!); // detiene y vacía cola :contentReference[oaicite:2]{index=2}

   //    if ((err as Error).message === 'TIMEOUT_NO_RESULT') {
   //       return interaction.editReply('⚠️ No se encontró música en 20 s.');
   //    }
   //    throw err;
   // }
};

// await playWithTimeout()
// const foundMusic = await Promise.race([
//    interaction.client.player?.play(voiceChannel, query, {
//       member: interaction.member,
//       textChannel: textChannel,
//    }),
//    new Promise((_, reject) =>
//       setTimeout(() => reject(new Error('TIMEOUT_NO_RESULT')), 20_000)
//    ),
// ]);
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

interface Props {
   nameMusic?: string,
   duration?: string,
   currentDuration?: string,
   imageMusic?: string,
   voiceChannel?: string,
   quantityInQueue?: string,
}

export const controlComponent = ({ nameMusic, duration, currentDuration, imageMusic, voiceChannel, quantityInQueue }: Props) => {

   const infoMusicEmbed = new EmbedBuilder()
      .setColor('#0099ff')
      .setDescription(`\`🎵 ${nameMusic}\``)
      .setAuthor({
         name: 'Panel de control',
      })
      .addFields(
         {
            name: '\u200B',
            value: '\u200B'
         },
         {
            name: `⏱️ Duracion`,
            value: `\`${currentDuration} / ${duration}\``,
            inline: true,
         },
         {
            name: '🎧 Canal de voz',
            value: `\`   ${voiceChannel}   \``,
            inline: true
         },
         {
            name: '📃 En cola',
            value: `\`   ${quantityInQueue}   \``,
            inline: true
         },
      );
   console.log({ imageMusic });
   if (imageMusic && typeof imageMusic === 'string' && imageMusic.startsWith('http')) {
      infoMusicEmbed.setThumbnail(`${imageMusic}`);
   }

   const btnBack = new ButtonBuilder()
      .setCustomId('btnBack')
      // .setLabel('Atras')
      .setEmoji('⏪')
      .setStyle(ButtonStyle.Secondary);
   const btnPause = new ButtonBuilder()
      .setCustomId('btnPause')
      // .setLabel('Pausar')
      .setEmoji('⏸️')
      .setStyle(ButtonStyle.Secondary);


   const btnPass = new ButtonBuilder()
      .setCustomId('btnPass')
      // .setLabel('Adelantar')
      .setEmoji('⏩')
      .setStyle(ButtonStyle.Secondary);

   const btnPlay = new ButtonBuilder()
      .setCustomId('btnPlay')
      // .setLabel('Play')
      .setEmoji('▶️')
      .setStyle(ButtonStyle.Secondary);

   const btnStop = new ButtonBuilder()
      .setCustomId('btnStop')
      // .setLabel('Detener')
      .setEmoji('⏹️')
      .setStyle(ButtonStyle.Secondary);

   const btnMuteSong = new ButtonBuilder()
      .setCustomId('btnMuteSong')
      .setLabel('Silenciar')
      .setEmoji('🔇')
      .setStyle(ButtonStyle.Secondary);

   const btnActiveSong = new ButtonBuilder()
      .setCustomId('btnActiveSong')
      .setLabel('Activar')
      .setEmoji('🔊')
      .setStyle(ButtonStyle.Secondary);

   const btnPlaylist = new ButtonBuilder()
      .setCustomId('btnPlaylist')
      .setLabel('Lista de reproduce')
      .setEmoji('📃')
      .setStyle(ButtonStyle.Secondary);


   const row1 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
         btnBack, btnPause, btnPass, btnPlay, btnStop
      );

   const row2 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
         btnMuteSong, btnActiveSong, btnPlaylist
      );

   return {
      embeds: [infoMusicEmbed],
      components: [row1, row2],
   }
}

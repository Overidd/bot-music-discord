import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { EventButtons } from "../../../doman/types";

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
      .setCustomId(EventButtons.BTN_BACK)
      // .setLabel('Atras')
      .setEmoji('⏪')
      .setStyle(ButtonStyle.Secondary);

   const btnPause = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PAUSE)
      // .setLabel('Pausar')
      .setEmoji('⏸️')
      .setStyle(ButtonStyle.Secondary);


   const btnPass = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_SKIP)
      // .setLabel('Adelantar')
      .setEmoji('⏩')
      .setStyle(ButtonStyle.Secondary);

   const btnPlay = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PLAY)
      // .setLabel('Play')
      .setEmoji('▶️')
      .setStyle(ButtonStyle.Secondary);

   const btnStop = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_STOP)
      // .setLabel('Detener')
      .setEmoji('⏹️')
      .setStyle(ButtonStyle.Secondary);

   const btnMuteSong = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_MUTESONG)
      .setLabel('Silenciar')
      .setEmoji('🔇')
      .setStyle(ButtonStyle.Secondary);

   const btnActiveSong = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_ACTIVESONG)
      .setLabel('Activar')
      .setEmoji('🔊')
      .setStyle(ButtonStyle.Secondary);

   const btnPlaylist = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PLAYLIST)
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

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
      .setCustomId(EventButtons.BTN_BACK.name)
      // .setLabel('Atras')
      .setEmoji(EventButtons.BTN_BACK.emoji)
      .setStyle(ButtonStyle.Secondary);

   const btnPause = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PAUSE.name)
      // .setLabel('Pausar')
      .setEmoji(EventButtons.BTN_PAUSE.emoji)
      .setStyle(ButtonStyle.Secondary);


   const btnPass = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_SKIP.name)
      // .setLabel('Adelantar')
      .setEmoji(EventButtons.BTN_SKIP.emoji)
      .setStyle(ButtonStyle.Secondary);

   const btnPlay = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PLAY.name)
      // .setLabel('Play')
      .setEmoji(EventButtons.BTN_PLAY.emoji)
      .setStyle(ButtonStyle.Secondary);

   const btnStop = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_STOP.name)
      // .setLabel('Detener')
      .setEmoji(EventButtons.BTN_STOP.emoji)
      .setStyle(ButtonStyle.Secondary);

   const btnMuteSong = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_MUTESONG.name)
      .setLabel(EventButtons.BTN_MUTESONG.label)
      .setEmoji(EventButtons.BTN_MUTESONG.emoji)
      .setStyle(ButtonStyle.Secondary);

   const btnActiveSong = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_ACTIVESONG.name)
      .setLabel(EventButtons.BTN_ACTIVESONG.label)
      .setEmoji(EventButtons.BTN_ACTIVESONG.emoji)
      .setStyle(ButtonStyle.Secondary);

   const btnPlaylist = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PLAYLIST.name)
      .setLabel(EventButtons.BTN_PLAYLIST.label)
      .setEmoji(EventButtons.BTN_PLAYLIST.emoji)
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

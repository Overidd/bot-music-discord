import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { EventButtons } from '../../../doman/types';
import { ValidateUrl } from '../../../utils';

interface Props {
   nameMusic?: string,
   urlMusic?: string,
   duration?: string,
   currentDuration?: string,
   imageMusic?: string,
   voiceChannel?: string,
   quantityInQueue?: string,
   nameSourceMusic?: string,
   volumen?: string,
}

const imageSocialMusic: { [key: string]: string } = {
   'soundcloud': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114336/uzyz3dttiftkpjqt2tuf.png',
   'youtube': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114335/lidqhayybfxkf5pbjfxg.png',
   'spotify': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114335/jsribordfkvsj4pjnyn1.png',
}


export const controlComponent = ({
   nameMusic,
   urlMusic,
   duration,
   currentDuration,
   imageMusic,
   voiceChannel,
   quantityInQueue,
   nameSourceMusic,
   volumen,
}: Props) => {

   const infoMusicEmbed = new EmbedBuilder()
      .setColor('#5865f2')
      .setTitle(`\`🎵 ${nameMusic}\``)
      .setAuthor({
         name: 'Panel de control',
         iconURL: nameSourceMusic && imageSocialMusic.hasOwnProperty(nameSourceMusic)
            ? imageSocialMusic[nameSourceMusic]
            : undefined
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
            name: '🔊 Volumen',
            value: `\`   ${volumen}%   \``,
            inline: true
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

   if (ValidateUrl.baseHttp(urlMusic)) infoMusicEmbed.setURL(urlMusic!);


   if (ValidateUrl.baseHttp(imageMusic)) infoMusicEmbed.setThumbnail(`${imageMusic}`);

   const btnBack = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_BACK.name)
      // .setLabel('Atras')
      .setEmoji(EventButtons.BTN_BACK.emoji)
      .setStyle(ButtonStyle.Primary);

   const btnPause = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PAUSE.name)
      // .setLabel('Pausar')
      .setEmoji(EventButtons.BTN_PAUSE.emoji)
      .setStyle(ButtonStyle.Primary);


   const btnPass = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_SKIP.name)
      // .setLabel('Adelantar')
      .setEmoji(EventButtons.BTN_SKIP.emoji)
      .setStyle(ButtonStyle.Primary);

   // const btnPlay = new ButtonBuilder()
   //    .setCustomId(EventButtons.BTN_PLAY.name)
   //    // .setLabel('Play')
   //    .setEmoji(EventButtons.BTN_PLAY.emoji)
   //    .setStyle(ButtonStyle.Primary);

   const btnStop = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_STOP.name)
      // .setLabel('Detener')
      .setEmoji(EventButtons.BTN_STOP.emoji)
      .setStyle(ButtonStyle.Danger);

   const btnMuteSong = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_MUTESONG.name)
      .setLabel(EventButtons.BTN_MUTESONG.label)
      .setEmoji(EventButtons.BTN_MUTESONG.emoji)
      .setStyle(ButtonStyle.Secondary);

   // const btnActiveSong = new ButtonBuilder()
   //    .setCustomId(EventButtons.BTN_ACTIVESONG.name)
   //    .setLabel(EventButtons.BTN_ACTIVESONG.label)
   //    .setEmoji(EventButtons.BTN_ACTIVESONG.emoji)
   //    .setStyle(ButtonStyle.Secondary);

   const btnPlaylist = new ButtonBuilder()
      .setCustomId(EventButtons.BTN_PLAYLIST.name)
      .setLabel(EventButtons.BTN_PLAYLIST.label)
      .setEmoji(EventButtons.BTN_PLAYLIST.emoji)
      .setStyle(ButtonStyle.Secondary);


   const row1 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
         btnBack, btnPause, btnPass, btnStop
      );

   const row2 = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
         btnMuteSong, btnPlaylist
      );

   return {
      embeds: [infoMusicEmbed],
      components: [row1, row2],
   }
}

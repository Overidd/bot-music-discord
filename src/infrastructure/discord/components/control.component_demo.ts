import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from 'discord.js';
import { dataButtons, EventButtons } from '../../../doman/types';
import { ValidateUrl } from '../../../utils';
import { ButtonComponents } from './button.component';

interface ICreateEmdeb {
   nameMusic?: string,
   nameSourceMusic?: string,
   currentDuration?: string,
   duration?: string,
   volumen?: string,
   quantityInQueue?: string,
   urlMusic?: string,
   imageMusic?: string,
}

interface ICreateButtons {
   isActiveSong: boolean,
   isMuteSong: boolean,
   isPause?: boolean,
   isResume?: boolean,
}

interface Props extends ICreateEmdeb {
   voiceChannel?: string,
}

const imageSocialMusic: { [key: string]: string } = {
   'soundcloud': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114336/uzyz3dttiftkpjqt2tuf.png',
   'youtube': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114335/lidqhayybfxkf5pbjfxg.png',
   'spotify': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114335/jsribordfkvsj4pjnyn1.png',
}

export class ControlComponent {

   static createEmbed({
      nameMusic,
      nameSourceMusic,
      currentDuration,
      duration,
      volumen,
      quantityInQueue,
      urlMusic,
      imageMusic,
   }: ICreateEmdeb) {
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
               value: `\`   ${duration}   \``,
               inline: true,
            },
            {
               name: '🔊 Volumen',
               value: `\`   ${volumen}%   \``,
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

      return infoMusicEmbed
   }

   static createButtons(data?: ICreateButtons) {
      const buttons = new Set()

      if (!data) {
         const btns = dataButtons.filter(item => {
            return [EventButtons.BTN_PLAY.name, EventButtons.BTN_ACTIVESONG.name].includes(item.name) ? false : true;
         })

         for (const { emoji, label, name, style } of btns) {
            const btn = new ButtonBuilder()
               .setCustomId(name)
               .setEmoji(emoji)
               .setStyle(style as any);

            label && btn.setLabel(label);

            buttons.add(btn)
         }

         return buttons
      }

      for (const { emoji, label, name, style } of dataButtons) {
         if (name === EventButtons.BTN_PAUSE.name && !!data.isPause) continue;
         if (name === EventButtons.BTN_PLAY.name && !!data.isResume) continue;
         if (name === EventButtons.BTN_MUTESONG.name && !!data.isMuteSong) continue;
         if (name === EventButtons.BTN_ACTIVESONG.name && !!data.isActiveSong) continue;

         const btn = new ButtonBuilder()
            .setCustomId(name)
            // .setLabel('Atras')
            .setEmoji(emoji)
            .setStyle(style as any);
         label && btn.setLabel(label);

         buttons.add(btn)
      }

      return buttons
   }

   static buildRows(buttons: Set<ButtonBuilder>) {
      const rows: ActionRowBuilder<ButtonBuilder>[] = [];
      let row = new ActionRowBuilder<ButtonBuilder>();
      rows.push(row);

      Array.from(buttons).forEach((item, index) => {
         if ((index + 1) % 5 === 0) {
            row = new ActionRowBuilder<ButtonBuilder>();
            rows.push(row);
         }
         row.addComponents(item);
      });

      return rows;
   }

   static createDefault(data: Props) {
      const infoMusicEmbed = this.createEmbed(data);
      const buttons = this.createButtons();
      return {
         embeds: [infoMusicEmbed],
         components: this.buildRows(buttons as any),
      };
   }

   static createWithState(data: Props, dataButton: ICreateButtons) {
      const infoMusicEmbed = this.createEmbed(data);
      const buttons = this.createButtons(dataButton);
      return {
         embeds: [infoMusicEmbed],
         components: this.buildRows(buttons as any),
      };
   }

   static updateButton(
      components: any[],
      targetName: string,
      replacement: ButtonBuilder
   ) {
      const row = new ActionRowBuilder<ButtonBuilder>();
      components.forEach(item => {
         if (item?.data?.custom_id === targetName) {
            row.addComponents(replacement);
         } else {
            row.addComponents(item);
         }
      });
      return row;
   }

   static updateToPause(components: ButtonBuilder[]) {
      return this.updateButton(components, EventButtons.BTN_PLAY.name, ButtonComponents.basic(EventButtons.BTN_PAUSE));
   }

   static updateToPlaying(components: ButtonBuilder[]) {
      return this.updateButton(components, EventButtons.BTN_PAUSE.name, ButtonComponents.basic(EventButtons.BTN_PLAY));
   }

   static updateToMuteSong(components: Array<ButtonBuilder | any>) {
      return this.updateButton(components, EventButtons.BTN_ACTIVESONG.name, ButtonComponents.basic(EventButtons.BTN_MUTESONG));
   }

   static updateToActiveSong(components: Array<ButtonBuilder | any>) {
      return this.updateButton(components, EventButtons.BTN_MUTESONG.name, ButtonComponents.basic(EventButtons.BTN_ACTIVESONG))
   }




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
         btnBack, btnPause, btnPass, btnStop
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

import { ButtonComponents } from './button';
import { EventButtons } from '../../../doman/types';
import {
   LangCode,
   Translator,
   ValidateUrl
} from '../../../utils';

import {
   configControlComponet,
   imageDefaul,
} from '../../../config';

import {
   ActionRow,
   ActionRowBuilder,
   APIEmbed,
   ButtonBuilder,
   ButtonComponent,
   EmbedBuilder,
   JSONEncodable
} from 'discord.js';

interface IEmbedHeader {
   nameMusic?: string;
   nameSourceMusic?: string;
   urlMusic?: string;
   imageMusic?: string;
}
interface IEmbedBody {
   duration?: string,
   volume?: string,
   quantityInQueue?: string,
}

interface IEmbedFooter {
   text: string,
   iconUser?: string,
   textAction?: 'actionActivateSong' | 'actionMuteSong' | 'actionLoopActive' | 'actionLoopDisactive'
}

type FieldKeys = keyof typeof configControlComponet.embed.field;

class EmbedComponent {
   private emdeb?: EmbedBuilder;
   private translator?: Translator;
   private CONFIG_DATA = configControlComponet.embed;

   constructor() { // Lansar un error si se intenta crear la instancia 1directamente, sin usar el metodo statico create o from.
   }
   create() {
      this.emdeb = new EmbedBuilder();
      return this;
   }

   from(data: JSONEncodable<APIEmbed> | APIEmbed,) {
      this.emdeb = EmbedBuilder.from(data);
      return this;
   }

   setLang(lang: string = 'es') {
      this.translator = new Translator();
      this.CONFIG_DATA = this.translator
         .setLang(lang as LangCode)
         .object(configControlComponet.embed) as any;
      return this;
   }

   header(data: IEmbedHeader) {
      this.ensureEmbedExists();
      this.emdeb!.setColor(this.CONFIG_DATA.color as any);
      this.applyHeaderData(data);
      return this;
   }

   updateHeader(data: IEmbedHeader) {
      this.ensureEmbedExists();
      this.applyHeaderData(data);
      return this;
   }

   body(data: IEmbedBody) {
      this.ensureEmbedExists();
      const fields = Object.entries(data).map(([key, value]) => {
         const field = this.CONFIG_DATA.field[key as FieldKeys]
         return {
            name: field.label,
            value: field.value(value),
            inline: true,
         }
      })

      this.emdeb!.addFields(...fields);
      return this;
   }

   bodyUpdate(data: Partial<IEmbedBody>) {
      Object.entries(data).forEach(([key, value]) => {
         if (!value) return;
         this.updateField(key as any, value)
      })
      return this
   }

   footer(data: IEmbedFooter) {
      this.ensureEmbedExists();
      this.emdeb?.setFooter({
         text: data.text,
         iconURL: data.iconUser,
      })
      return this
   }

   footerUpdate(data: Partial<IEmbedFooter>) {
      if (!this.emdeb) return this;
      const footer = this.emdeb.data.footer;

      if (data.text && footer?.text) {
         footer.text = `${this.translator?.t(data.textAction!)} ${data.text}`
      }

      if (data.iconUser && footer?.icon_url) {
         footer.icon_url = data.iconUser;
      }

      return this
   }

   build(): EmbedBuilder {
      this.ensureEmbedExists();
      return this.emdeb!;
   }

   private ensureEmbedExists() {
      if (!this.emdeb) {
         throw new Error('EmbedBuilder no está inicializado. Usa EmbedComponent.create() o from().');
      }
   }

   private applyHeaderData({
      nameMusic,
      nameSourceMusic,
      urlMusic,
      imageMusic
   }: IEmbedHeader) {
      const embed = this.emdeb!;

      if (nameSourceMusic) embed.setAuthor({
         name: this.CONFIG_DATA.nameAutor,
         iconURL: imageDefaul[nameSourceMusic] ?? undefined
      });

      if (nameMusic) embed.setDescription(this.CONFIG_DATA.description(nameMusic, urlMusic));
      // if (ValidateUrl.baseHttp(urlMusic)) embed.setURL(urlMusic!);

      embed.setThumbnail(imageMusic ?? imageDefaul.defaulImagenMusic)
   }

   private updateField(fieldKey: keyof IEmbedBody, newValue: string) {
      if (!this.emdeb || !this.emdeb.data.fields) return this;
      const fieldMap = this.CONFIG_DATA.field[fieldKey as FieldKeys];
      const field = this.emdeb.data.fields.find(f => f.name === fieldMap.label);
      if (field) {
         field.value = fieldMap.value(newValue)
      }
   }
}


interface ICreateButtons {
   isActiveSong: boolean,
   isPlaying: boolean,
   isActiveLoop: boolean,
}
class ButtonsComponent {
   private buttons: Set<ButtonBuilder> = new Set()
   private BUTTON_DATA = configControlComponet.buttons

   constructor() { }

   create(data?: ICreateButtons) {
      if (!data) {
         const btns = Object.values(this.BUTTON_DATA).filter(item => {
            return [EventButtons.BTN_PLAY, EventButtons.BTN_ACTIVESONG, EventButtons.BTN_LOOPDISACTIVE].includes(item.name) ? false : true;
         })

         for (const { emoji, label, name, style, canShowLabel } of btns) {
            const btn = new ButtonBuilder()
               .setCustomId(name)
               .setEmoji(emoji)
               .setStyle(style as any);

            canShowLabel && btn.setLabel(label);

            this.buttons.add(btn)
         }
         return this;
      }

      for (const { emoji, label, name, style, canShowLabel } of Object.values(this.BUTTON_DATA)) {
         if (name === EventButtons.BTN_PAUSE && !data.isPlaying ||
            name === EventButtons.BTN_PLAY && data.isPlaying
         ) continue;

         if (name === EventButtons.BTN_MUTESONG && !data.isActiveSong
            || name === EventButtons.BTN_ACTIVESONG && data.isActiveSong
         ) continue;

         if (name === EventButtons.BTN_LOOPACTIVE && !data.isActiveLoop ||
            name === EventButtons.BTN_LOOPDISACTIVE && data.isActiveLoop
         ) continue;

         const btn = new ButtonBuilder()
            .setCustomId(name)
            .setEmoji(emoji)
            .setStyle(style as any);
         canShowLabel && btn.setLabel(label);
         this.buttons.add(btn)
      }
      return this;
   }

   from(components: Array<ActionRow<ButtonComponent>>) {
      for (const row of components) {
         for (const component of row?.components) {
            if (!component) continue;

            const btnData = component.data as any;

            if (!btnData.label && !btnData.emoji) {
               return;
            }

            this.buttons.add(ButtonBuilder.from(btnData));
         }
      }
      return this;
   }

   setLang(lang: string = 'es') {
      this.BUTTON_DATA = new Translator()
         .setLang(lang as LangCode)
         .object(configControlComponet.buttons) as any;
      return this;
   }

   buildRows() {
      const rows: ActionRowBuilder<ButtonBuilder>[] = [];
      let currentRow = new ActionRowBuilder<ButtonBuilder>();
      rows.push(currentRow);

      Array.from(this.buttons).forEach((item, index) => {
         if ((index + 1) % 6 === 0) {
            currentRow = new ActionRowBuilder<ButtonBuilder>();
            if (index === this.buttons.size) return;
            rows.push(currentRow);
         }
         currentRow.addComponents(item);
      });

      return rows;
   }

   updateToPause() {
      return this.updateButton(EventButtons.BTN_PLAY, ButtonComponents.basic(this.BUTTON_DATA.btnPause));
   }

   updateToPlaying() {
      return this.updateButton(EventButtons.BTN_PAUSE, ButtonComponents.basic(this.BUTTON_DATA.btnPlay));
   }

   updateToMuteSong() {
      return this.updateButton(EventButtons.BTN_ACTIVESONG, ButtonComponents.basic(this.BUTTON_DATA.btnMuteSong));
   }

   updateToActiveSong() {
      return this.updateButton(EventButtons.BTN_MUTESONG, ButtonComponents.basic(this.BUTTON_DATA.btnActiveSong))
   }

   updateToActiveLoop() {
      return this.updateButton(EventButtons.BTN_LOOPDISACTIVE, ButtonComponents.basic(this.BUTTON_DATA.btnLoopActive));
   }

   updateToDisactiveLoop() {
      return this.updateButton(EventButtons.BTN_LOOPACTIVE, ButtonComponents.basic(this.BUTTON_DATA.btnLoopDesactive));
   }

   private getCustomId(button: ButtonBuilder): string | undefined {
      return (button as any)?.data?.custom_id;
   }

   private updateButton(
      targetName: string,
      replacement: ButtonBuilder
   ) {
      const updatedButtons = Array.from(this.buttons).map((button: any) => {
         return this.getCustomId(button) === targetName ? replacement : button;
      });

      this.buttons = new Set(updatedButtons);
      return this
   }
}

export class PanelStatusComponent {
   static Embed = EmbedComponent;
   static Buttons = ButtonsComponent;
}
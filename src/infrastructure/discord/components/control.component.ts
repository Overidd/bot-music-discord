import { ActionRow, ActionRowBuilder, APIEmbed, ButtonBuilder, ButtonComponent, EmbedBuilder, JSONEncodable } from 'discord.js';
import { dataButtons, EventButtons } from '../../../doman/types';
import { ValidateUrl } from '../../../utils';
import { ButtonComponents } from './button.component';

export const imageSocialMusic: { [key: string]: string } = {
   'soundcloud': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114336/uzyz3dttiftkpjqt2tuf.png',
   'youtube': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114335/lidqhayybfxkf5pbjfxg.png',
   'spotify': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746114335/jsribordfkvsj4pjnyn1.png',
   'defaulImagenMusic': 'https://res.cloudinary.com/df4jfvyjm/image/upload/v1746389023/c2gw81pbqsimneruyyde.gif',
}

interface IEmbedHeader {
   nameMusic?: string;
   nameSourceMusic?: string;
   urlMusic?: string;
   imageMusic?: string;
}
interface IEmbedBody {
   duration: string,
   volumen: string,
   quantityInQueue: string,
}

interface IEmbedFooter {
   text: string,
   iconUser?: string,
}

const FIELD_MAP = {
   duration: '⏱️ Duracion',
   volumen: '🔊 Volumen',
   quantityInQueue: '📃 En cola'
};

class EmbedComponent {
   private emdeb?: EmbedBuilder;

   constructor() { // Lansar un error si se intenta crear la instancia directamente, sin usar el metodo statico create o from.
   }

   static create() {
      const newEdeb = new this();
      newEdeb.emdeb = new EmbedBuilder();
      return newEdeb;
   }

   static from(data: JSONEncodable<APIEmbed> | APIEmbed) {
      const newEdeb = new this();
      newEdeb.emdeb = EmbedBuilder.from(data);
      return newEdeb;
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
         name: 'Panel de control',
         iconURL: imageSocialMusic[nameSourceMusic] ?? undefined
      });

      if (nameMusic) embed.setTitle(`\`🎵 ${nameMusic}\``);

      if (ValidateUrl.baseHttp(urlMusic)) embed.setURL(urlMusic!);

      embed.setThumbnail(imageMusic ?? imageSocialMusic.defaulImagenMusic)
   }

   header(data: IEmbedHeader) {
      this.ensureEmbedExists();
      this.emdeb!.setColor('#5865f2');
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
      const fields = Object.entries(data).map(([key, value]) => ({
         name: FIELD_MAP[key as keyof IEmbedBody],
         value: `\`   ${key === 'volumen' ? value + '%' : value === 'Live' ? `${value} 🔴` : value}   \``,
         inline: true
      }));

      this.emdeb!.addFields({ name: '\u200B', value: '\u200B' }, ...fields);
      return this;
   }

   private updateField(fieldKey: keyof IEmbedBody, newValue: string) {
      if (!this.emdeb || !this.emdeb.data.fields) return this;

      const name = FIELD_MAP[fieldKey];
      const field = this.emdeb.data.fields.find(f => f.name === name);
      if (field) {
         field.value = `\`   ${fieldKey === 'volumen' ? newValue + '%' : newValue}   \``;
      }
   }

   // setFields(fields: APIEmbedField[]) {
   //    this.emdeb!.data.fields = fields;
   //    return this;
   // }

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
         footer.text = data.text
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
}

interface ICreateButtons {
   isActiveSong: boolean,
   // isMuteSong: boolean,
   // isPaused: boolean,
   isPlaying: boolean,
   isActiveLoop: boolean,
   // isDeactiveLoop: boolean,
}
class ButtonsComponent {
   private buttons: Set<ButtonBuilder> = new Set()

   constructor() { }

   static create(data?: ICreateButtons) {
      const newButtons = new ButtonsComponent()

      if (!data) {
         const btns = dataButtons.filter(item => {
            return [EventButtons.BTN_PLAY.name, EventButtons.BTN_ACTIVESONG.name, EventButtons.BTN_DISACTIVELOOP.name].includes(item.name) ? false : true;
         })

         for (const { emoji, label, name, style } of btns) {
            const btn = new ButtonBuilder()
               .setCustomId(name)
               .setEmoji(emoji)
               .setStyle(style as any);

            label && btn.setLabel(label);

            newButtons.buttons.add(btn)
         }
         return newButtons
      }

      for (const { emoji, label, name, style } of dataButtons) {
         // if (name === EventButtons.BTN_PAUSE.name && data.isPaused) continue;
         if (name === EventButtons.BTN_PAUSE.name && !data.isPlaying ||
            name === EventButtons.BTN_PLAY.name && data.isPlaying
         ) continue;

         if (name === EventButtons.BTN_MUTESONG.name && !data.isActiveSong
            || name === EventButtons.BTN_ACTIVESONG.name && data.isActiveSong
         ) continue;

         if (name === EventButtons.BTN_ACTIVELOOP.name && !data.isActiveLoop ||
            name === EventButtons.BTN_DISACTIVELOOP.name && data.isActiveLoop
         ) continue;

         const btn = new ButtonBuilder()
            .setCustomId(name)
            // .setLabel('Atras')
            .setEmoji(emoji)
            .setStyle(style as any);
         label && btn.setLabel(label);

         newButtons.buttons.add(btn)
      }
      return newButtons
   }

   static from(components: Array<ActionRow<ButtonComponent>>) {
      const newButtons = new this();

      for (const row of components) {
         for (const component of row?.components) {
            newButtons.loadComponetButtons(component);
         }
      }
      return newButtons;
   }

   private loadComponetButtons(component: any) {
      if (!component) return;

      const btnData = component.data;

      if (!btnData.label && !btnData.emoji) {
         return;
      }

      this.buttons.add(ButtonBuilder.from(btnData));
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
      // return this.buildRows();
      return this
   }

   updateToPause() {
      return this.updateButton(EventButtons.BTN_PLAY.name, ButtonComponents.basic(EventButtons.BTN_PAUSE));
   }

   updateToPlaying() {
      return this.updateButton(EventButtons.BTN_PAUSE.name, ButtonComponents.basic(EventButtons.BTN_PLAY));
   }

   updateToMuteSong() {
      return this.updateButton(EventButtons.BTN_ACTIVESONG.name, ButtonComponents.basic(EventButtons.BTN_MUTESONG));
   }

   updateToActiveSong() {
      return this.updateButton(EventButtons.BTN_MUTESONG.name, ButtonComponents.basic(EventButtons.BTN_ACTIVESONG))
   }

   updateToActiveLoop() {
      return this.updateButton(EventButtons.BTN_DISACTIVELOOP.name, ButtonComponents.basic(EventButtons.BTN_ACTIVELOOP));
   }

   updateToDisactiveLoop() {
      return this.updateButton(EventButtons.BTN_ACTIVELOOP.name, ButtonComponents.basic(EventButtons.BTN_DISACTIVELOOP));
   }

}

export class PanelStatusComponent {
   embed = EmbedComponent;
   buttons = ButtonsComponent;
}
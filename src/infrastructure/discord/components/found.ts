import { EmbedBuilder } from 'discord.js';
import { ConfigFoundComponent } from '../../../config';
import { LangCode, Translator } from '../../../utils';

interface IEmbedHeader {
   nameMusic: string;
   urlMusic?: string;
   imageMusic?: string;
}

interface IEmbedBody {
   autor: string;
   duration: string;
   source: string;
}

interface IEmbedFooter {
   text: string;
   iconURL: string;
}

export class FoundComponent {
   embed = new EmbedBuilder()
   CONFIG_DATA = ConfigFoundComponent

   constructor() { }

   setLang(lang: string) {
      this.CONFIG_DATA = new Translator()
         .setLang(lang as LangCode)
         .object(ConfigFoundComponent) as any;
      return this;
   }

   header(data: IEmbedHeader) {
      const name = data.nameMusic.length > this.CONFIG_DATA.nameAutor.maxLength
         ? data.nameMusic.slice(0, this.CONFIG_DATA.nameAutor.maxLength) + this.CONFIG_DATA.nameAutor.ellipsis
         : data.nameMusic

      this.embed
         .setColor(this.CONFIG_DATA.color as any)
         .setAuthor({
            name: this.CONFIG_DATA.nameAutorFormat(this.CONFIG_DATA.nameAutor.label, name),
            ...(this.CONFIG_DATA.nameAutor.canShowIconUrl ? { iconURL: data.imageMusic } : {})
         })

      return this
   }

   body(data: Partial<IEmbedBody>) {
      const contents = Object.entries(data).map(([key, value]) => {
         return this.CONFIG_DATA.fieldFormat(this.CONFIG_DATA.field[key as keyof typeof this.CONFIG_DATA.field], value)
      })

      this.embed.setDescription(contents.join('\n'))
      return this
   }

   footer(data: IEmbedFooter) {
      this.embed.setFooter({
         text: data.text,
         iconURL: data.iconURL,
      })
      return this
   }

   build(): EmbedBuilder {
      return this.embed;
   }
}
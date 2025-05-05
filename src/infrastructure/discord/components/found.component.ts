import { EmbedBuilder } from 'discord.js';
import { ValidateUrl } from '../../../utils';

interface IEmbedHeader {
   nameMusic: string;
   urlMusic: string;
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

const FIELD_MAP: { [key: string]: any } = {
   duration: 'Autor',
   volumen: 'Duracion',
   source: 'Fuente'
};

export class FoundComponent {
   embed = new EmbedBuilder()

   constructor() { }

   header(data: Partial<IEmbedHeader>) {
      this.embed.setAuthor({
         name: 'Musica agregado',
         iconURL: data.imageMusic
      });

      if (data.nameMusic) this.embed.setTitle(`\`${data.nameMusic}\``);

      if (ValidateUrl.baseHttp(data.urlMusic)) this.embed.setURL(data.urlMusic!);
      return this
   }

   body(data: Partial<IEmbedBody>) {
      const contents = Object.entries(data).map(([key, value]) => {
         return `• ${FIELD_MAP[key]}: **${value}**`
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
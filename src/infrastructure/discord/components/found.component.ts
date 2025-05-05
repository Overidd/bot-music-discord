import { EmbedBuilder } from 'discord.js';

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

const FIELD_MAP: { [key: string]: any } = {
   autor: 'Autor',
   duration: 'Duracion',
   source: 'Fuente'
};

export class FoundComponent {
   embed = new EmbedBuilder()

   constructor() { }

   header(data: IEmbedHeader) {
      const name = data.nameMusic.length > 25 ? data.nameMusic.slice(0, 25) + '...' : data.nameMusic
      this.embed
         .setColor('#5865f2')
         .setAuthor({
            name: `Agregado: ${name}`,
            iconURL: data.imageMusic
         })

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
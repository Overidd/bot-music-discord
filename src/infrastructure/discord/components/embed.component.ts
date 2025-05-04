import { EmbedBuilder } from 'discord.js';


export class EmdebComponent {

   public static error(text: string) {
      return new EmbedBuilder()
         .setColor('#fb3823')
         .setDescription(`\`${text}\``)

   }


}
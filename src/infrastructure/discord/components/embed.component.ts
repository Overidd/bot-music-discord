import { EmbedBuilder } from 'discord.js';


export class EmbedComponent {

   public static error(text: string) {
      return new EmbedBuilder()
         .setColor('#fb3823')
         .setDescription(`\`⛔ ${text}\``)
   }

   public static success(text: string) {
      return new EmbedBuilder()
         .setColor('#5865f2')
         .setDescription(`\`${text}\``)
   }

   public static warning(text: string) {
      return new EmbedBuilder()
         .setColor('#ffc107')
         .setDescription(`\`⚠️ ${text}\``)
   }
}
import { EmbedBuilder } from "discord.js";



export class EmdebComponent {

   public static emdebError(text: string) {
      const emdeb = new EmbedBuilder()
         .setColor('#fb3823')
         .setDescription(`\`${text}\``)

      return emdeb
   }


}
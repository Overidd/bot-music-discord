import { ButtonBuilder } from 'discord.js';

interface IButtonBasic {
   name: string,
   emoji: string,
   label?: string,
   style: number,
}

export class ButtonComponents {

   static basic(data: IButtonBasic) {
      const btn = new ButtonBuilder()
         .setCustomId(data.name)
         .setEmoji(data.emoji)
         .setStyle(data.style as any);

      if (data.label) {
         btn.setLabel(data.label)
      }

      return btn
   }
}
import { EmbedBuilder } from "discord.js";
import { embedComponentConfig } from "../../../config";
import { LangCode, Translator, typeErrorLang, typeSuccessLag, typeWarning } from "../../../utils";

export class EmbedComponent {
   CONFIG_DATA = embedComponentConfig;
   private translator?: Translator;

   setLang(lang: string = 'es') {
      this.translator = new Translator().setLang(lang as LangCode);
      return this;
   }

   private buildEmbed(
      category: keyof typeof embedComponentConfig,
      type: string,
      value?: string
   ): EmbedBuilder {
      const config = this.CONFIG_DATA[category];
      const typeConfig = config.types?.[type];
      const emoji = typeConfig?.emoji ?? config.emoji ?? '📢';
      const text = this.translator?.t(type) ?? type;

      return new EmbedBuilder()
         .setColor(config.color as any)
         .setDescription(config.value(emoji, text, value));
   }

   // Métodos públicos
   public error(typeText: typeErrorLang) {
      return this.buildEmbed('error', typeText);
   }

   public warning(typeText: typeWarning) {
      return this.buildEmbed('warning', typeText);
   }

   public success(typeText: typeSuccessLag) {
      return this.buildEmbed('success', typeText);
   }

   public settingLanguaje(value: string) {
      return this.buildEmbed('settingLanguaje', 'settingLanguaje', value);
   }

   public settingVolumen(value: string) {
      return this.buildEmbed('settingVolumen', 'settingVolumen', value);
   }
}

import { EmbedBuilder } from 'discord.js';
import { LangCode, Translator, typeErrorLang, typeSuccessLag, typeWarning } from '../../../utils';
import { embedComponentConfig } from '../../../config';

export class EmbedComponent {
   CONFIG_DATA = embedComponentConfig
   private translator?: Translator;

   setLang(lang: string = 'es') {
      this.translator = new Translator()
         .setLang(lang as LangCode);
      return this;
   }

   public error(typeText: typeErrorLang) {
      const textTraslator = this.translator?.t(typeText) ?? typeText;
      return new EmbedBuilder()
         .setColor(this.CONFIG_DATA.error.color as any)
         .setDescription(this.CONFIG_DATA.error.value(textTraslator))
   }

   public success(typeText: typeSuccessLag) {
      const textTraslator = this.translator?.t(typeText) ?? typeText;

      return new EmbedBuilder()
         .setColor(this.CONFIG_DATA.success.color as any)
         .setDescription(this.CONFIG_DATA.success.value(textTraslator))
   }

   public warning(typeText: typeWarning) {
      const textTraslator = this.translator?.t(typeText) ?? typeText;

      return new EmbedBuilder()
         .setColor(this.CONFIG_DATA.warning.color as any)
         .setDescription(this.CONFIG_DATA.warning.value(textTraslator))
   }

   public settingLanguaje(value: string) {
      const textLang = this.translator?.t('settingLanguaje') ?? 'Not fount';

      return new EmbedBuilder()
         .setColor(this.CONFIG_DATA.settingLanguaje.color as any)
         .setDescription(this.CONFIG_DATA.settingLanguaje.value(textLang, value))
   }

   public settingVolumen(value: string) {
      const textLang = this.translator?.t('settingVolumen') ?? 'Not fount';

      return new EmbedBuilder()
         .setColor(this.CONFIG_DATA.settingVolumen.color as any)
         .setDescription(this.CONFIG_DATA.settingVolumen.value(textLang, value))
   }
}
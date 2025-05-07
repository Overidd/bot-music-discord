import { SlashCommandBuilder } from 'discord.js';
import { CustonInteraction } from '../../doman/types';
import { Timeout } from '../../utils';
import { EmbedComponent } from '../../infrastructure/discord';
import { ErrorService, LangService } from '../../application/service';
import { PanelStatusHandler } from '../../application/handler/controlPanel';

const languageChoices = [
   { name: '🇪🇸 Español', value: 'es' },
   { name: '🇬🇧 English', value: 'en' },
   // { name: '🇫🇷 Français', value: 'fr' },
   // { name: '🇩🇪 Deutsch', value: 'de' },
   // { name: '🇮🇹 Italiano', value: 'it' }
];
const languageEmoji = {
   es: '🇪🇸',
   en: '🇬🇧',
}

const DEFAULT_LANG = 'es';

const commandData = new SlashCommandBuilder()
   .setName('language')
   .setDescription('Cambia de idioma')
   .addStringOption(option =>
      option
         .setName('language')
         .setDescription('Selecciona un idioma')
         .setRequired(true)
         .addChoices(...languageChoices)
   );

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isChatInputCommand()) return;

   try {
      const lang = interaction.options.getString('language') ?? DEFAULT_LANG;
      const guildId = interaction.guildId!;
      const client = interaction.client;

      LangService.set(guildId, lang);
      await LangService.commandChange(guildId, lang)

      const controlPanelStatus = PanelStatusHandler.get(client, guildId);
      controlPanelStatus?.setLang(lang);

      const embed = new EmbedComponent()
         .setLang(lang)
         .settingLanguaje(languageEmoji[lang as keyof typeof languageEmoji]);

      // Envía respuesta con embed
      await interaction.reply({ embeds: [embed] });

      // Elimina respuesta tras 15s
      const response = await interaction.fetchReply();
      Timeout.delete(response, 15_000);

   } catch (error) {
      ErrorService.response(interaction, error as Error);
   }
};

export const command = {
   data: commandData,
   execute
};
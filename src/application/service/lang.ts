import cloneDeep from 'lodash/cloneDeep';
import { REST, Routes } from 'discord.js';
import { configBot, ENV } from '../../config';
import { InteractionFileLoader } from '../../infrastructure/fileLoader';

const slashCommandLang = {
   es: {
      controller: {
         name: 'controller',
         description: 'Panel de control',
      },

      language: {
         name: 'language',
         description: 'Cambia de idioma',
         options: [
            {
               name: 'language',
               description: 'Selecciona un idioma',
            }
         ]
      },

      play: {
         name: 'play',
         description: 'Musica de YouTube, Spotify',
         options: [
            {
               name: 'language',
               description: 'Busca por el nombre o url',
            }
         ]
      },

      volume: {
         name: 'volume',
         description: 'Controla el volumen',
         options: [
            {
               name: 'number',
               description: 'Ingresa el nivel de volumen',
            }
         ]
      }
   },

   en: {
      controller: {
         name: 'controller',
         description: 'Control panel',
      },

      language: {
         name: 'language',
         description: 'Change language',
         options: [
            {
               name: 'language',
               description: 'Select a language',
            }
         ]
      },

      play: {
         name: 'play',
         description: 'Music from YouTube, Spotify',
         options: [
            {
               name: 'language',
               description: 'Search by name or URL',
            }
         ]
      },

      volume: {
         name: 'volume',
         description: 'Control the volume',
         options: [
            {
               name: 'number',
               description: 'Enter the volume level',
            }
         ]
      }
   }
}

export class LangService {

   static get(guildId: string) {

      return 'es'
   }

   static set(guildId: string, lang: string) {


      return this
   }

   static async commandChange(guildId: string, lang: string) {

      const { commands } = await new InteractionFileLoader(configBot)
         .loadCommands();

      const commandTranslated = slashCommandLang[lang as keyof typeof slashCommandLang]

      const body = commands.map(command => {
         const commandCopy = cloneDeep(command.data.toJSON())

         if (!commandTranslated.hasOwnProperty(commandCopy.name)) {
            return commandCopy
         }
         const selectdCommand = commandTranslated[commandCopy.name as keyof typeof commandTranslated] as any;

         commandCopy.description = selectdCommand.description
         if (!commandCopy.hasOwnProperty('options')) {
            return commandCopy;
         }

         if (!selectdCommand.options) {
            return commandCopy;
         }

         commandCopy.options.map((option: any) => {
            const findOption = selectdCommand.options.find((op: any) => op.name === option.name)
            option.description = findOption ? findOption.description : option.description
         })

         return commandCopy;
      })

      const rest = new REST().setToken(configBot.TOKEN);

      await rest.put(
         Routes.applicationGuildCommands(ENV.CLIENT_ID_BOT, guildId), {
         body,
      })
   }
}
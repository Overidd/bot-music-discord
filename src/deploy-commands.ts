import { REST, Routes } from 'discord.js';
import { configBot, ENV } from './config';
import { InteractionFileLoader } from './infrastructure/fileLoader';

const main = async () => {
   const { commands } = await new InteractionFileLoader(configBot)
      .loading();

   const rest = new REST().setToken(configBot.TOKEN);

   try {
      console.log(`Empezó a actualizar ${commands.size} application (/) commands.`);

      const data = await rest.put(
         Routes.applicationCommands(ENV.CLIENT_ID_BOT),
         { body: commands.map(c => c.data.toJSON()) },
      ) as { length: number };

      console.log(`Recargado con éxito ${data.length} application (/) commands.`);
   } catch (error) {
      console.error(error);
   }
}

(() => {
   main();
})(); 
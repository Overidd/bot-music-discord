import { REST, Routes } from 'discord.js';
import { configBot, ENV } from './config';
import { CommandFileLoader } from './infrastructure/fileLoader';


const main = async () => {
   const commands = await new CommandFileLoader(configBot)
      .loadCommands();

   const rest = new REST().setToken(configBot.TOKEN);

   console.log(`Empezó a actualizar${commands.size} application (/) commands.`);

   try {
      const data = await rest.put(
         Routes.applicationGuildCommands(ENV.CLIENT_ID_BOT, ENV.GUILD_ID_SERVER),
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
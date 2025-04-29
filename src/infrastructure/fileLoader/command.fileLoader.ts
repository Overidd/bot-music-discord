import { Collection } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import { IConfigBot } from '../../doman/types';

export class CommandFileLoader {
   public commands: Collection<string, any> = new Collection();
   public config?: IConfigBot

   constructor(configBot: IConfigBot) {
      this.config = configBot
      this.loadCommands();
   }

   async loadCommands(): Promise<Collection<string, any>> {
      if (!this.config?.pathCommands) throw new Error('No pathCommands');

      const files = await fs.readdir(this.config.pathCommands);
      for (const file of files) {
         if (!file.endsWith('.js')) continue;

         const command = require(path.join(this.config.pathCommands, file));
         this.commands.set(command.name, command);
         console.log(`Loaded command: ${command.name}`);
      }

      return this.commands;
   }
}

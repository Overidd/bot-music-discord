import { Collection } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import { IConfigBot } from '../../doman/types';

export class CommandFileLoader {
   public commands: Collection<string, any> = new Collection();
   public config?: IConfigBot

   constructor(configBot: IConfigBot) {
      this.config = configBot
   }

   async loadCommands(): Promise<Collection<string, any>> {
      if (!this.config?.pathCommands) throw new Error('No pathCommands');

      const pathDir = path.join(__dirname, '../../../', this.config.pathCommands)

      const files = await fs.readdir(pathDir);
      for (const file of files) {
         if (!file.endsWith('.ts')) continue;

         const { command } = require(path.join(pathDir, file));
         this.commands.set(command.data.name, command);
         
         console.log(`Loaded command: ${command.data.name}`);
      }
      return this.commands;
   }
}

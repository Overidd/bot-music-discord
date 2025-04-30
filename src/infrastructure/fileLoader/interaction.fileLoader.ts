import fs from 'fs/promises';
import path from 'path';
import { Collection } from 'discord.js';
import { IButton, ICommand, IConfigBot } from '../../doman/types';

export class InteractionFileLoader {
   public commands = new Collection<string, ICommand>();
   public buttons = new Collection<string, IButton>();

   constructor(private config: IConfigBot) { }

   private async loadFiles<T>(
      dirPath: string,
      collection: Collection<string, T>,
      key: string
   ): Promise<Collection<string, T>> {
      const fullPath = path.join(__dirname, '../../../', dirPath);
      const files = await fs.readdir(fullPath);

      for (const file of files) {
         if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

         try {
            const module = await import(path.join(fullPath, file));
            const item: T = module[key];

            if (!item || typeof item !== 'object' || !('data' in item)) {
               console.warn(`Skipping invalid ${key} in ${file}`);
               continue;
            }

            const name = (item as any).data.name;

            collection.set(name, item);

            console.log(`Loaded ${key}: ${name}`);
         } catch (error) {
            console.error(`Failed to load ${key} from ${file}:`, error);
         }
      }

      return collection;
   }

   async loadCommands() {
      if (!this.config?.pathCommands) throw new Error('No pathCommands');
      await this.loadFiles<ICommand>(this.config.pathCommands, this.commands, 'command');

      return this
   }

   async loadButtons() {
      if (!this.config?.pathButtons) throw new Error('No pathButtons');
      await this.loadFiles<IButton>(this.config.pathButtons, this.buttons, 'button');
      return this
   }

   async loading(): Promise<this> {
      await this.loadButtons()
      await this.loadCommands()
      return this
   }
} 
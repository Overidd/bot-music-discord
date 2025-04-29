import { IConfigBot } from '../../doman/types';
import fs from 'fs/promises';
import path from 'path';

export class EventFileLoader {

   public config?: IConfigBot
   public onceEvents: any[] = [];
   public onEvents: any[] = [];

   constructor(configBot: IConfigBot) {
      this.config = configBot

      this.loadEvents();
   }

   public async loadEvents(): Promise<this> {
      if (!this.config?.pathEvents) throw new Error('No pathEvents');

      const fileNames = await fs.readdir(this.config.pathEvents);

      for (const fileName of fileNames) {
         if (!fileName.endsWith('.js')) continue;
         const event = require(path.join(this.config.pathEvents, fileName));

         (event.once)
            ? this.onceEvents.push(event)
            : this.onEvents.push(event);
      }
      return this;
   }
}


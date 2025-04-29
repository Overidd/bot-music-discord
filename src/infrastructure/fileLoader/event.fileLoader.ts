import { IConfigBot } from '../../doman/types';
import fs from 'fs/promises';
import path from 'path';

export class EventFileLoader {

   private config?: IConfigBot
   public onceEvents: any[] = [];
   public onEvents: any[] = [];

   constructor(configBot: IConfigBot) {
      this.config = configBot
   }

   public async loadEvents(): Promise<this> {
      if (!this.config?.pathEvents) throw new Error('No pathEvents');

      const pathDir = path.join(__dirname, '../../../', this.config.pathEvents)
      const fileNames = await fs.readdir(pathDir);

      for (const fileName of fileNames) {

         if (!fileName.endsWith('.ts')) continue;

         const { event } = await require(path.join(pathDir, fileName));

         (event.once)
            ? this.onceEvents.push(event)
            : this.onEvents.push(event);
      }
      return this;
   }
}


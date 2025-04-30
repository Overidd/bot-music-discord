import { IConfigBot } from '../../doman/types';
import fs from 'fs/promises';
import path from 'path';

export class EventFileLoader {

   private config?: IConfigBot
   public onceClientEvents: any[] = [];
   public onClientEvents: any[] = [];
   public onPlayerEvents: any[] = [];

   constructor(configBot: IConfigBot) {
      this.config = configBot
   }

   public async loading(): Promise<this> {
      if (!this.config?.pathEvents) throw new Error('No pathEvents');

      const pathDir = path.join(__dirname, '../../../', this.config.pathEvents)
      const fileNames = await fs.readdir(pathDir);

      for (const fileName of fileNames) {

         if (!fileName.endsWith('.ts')) continue;

         const { event } = await require(path.join(pathDir, fileName));

         (event.once)
            ? this.onceClientEvents.push(event)
            : this.onClientEvents.push(event);
      }

      const pathDirPlayer = path.join(__dirname, '../../../', this.config.pathEventsPlayer);

      const fileNamesPlayer = await fs.readdir(pathDirPlayer);

      for (const element of fileNamesPlayer) {

         if (!element.endsWith('.ts')) continue;

         const { event } = await require(path.join(pathDirPlayer, element));

         this.onPlayerEvents.push(event);
      }

      return this;
   }
}


import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { IConfigBot } from '../../doman/types';
import DisTube from 'distube'

interface ICommand {
   name: string;
   description: string;
   execute: (interaction: any) => Promise<void>;
}

export class ClientDiscord extends Client {
   public config?: IConfigBot;
   public player?: DisTube;
   public commands: Collection<string, ICommand> = new Collection();
   public language?: string;

   constructor() {
      super({
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
         ]
      })
   }

   public setCommand(commands: Collection<string, any>): this {
      this.commands = commands;
      return this;
   }

   public addCommand(command: ICommand): this {
      this.commands.set(command.name, command);
      return this;
   }

   public setConfig(configBot: IConfigBot): this {
      this.config = configBot;
      return this;
   }

   public setPlayer(player: DisTube): this {
      this.player = player;
      return this;
   }

   public setLanguage(language: string): this {
      this.language = language || 'es';
      return this;
   }

   public setOnceClientEvent(events: { event: string, execute: (...args: any[]) => void }[]): this {

      for (const { event, execute } of events) {
         this.once(event, execute);
      };
      return this;
   }

   public setOnClientEvent(events: { event: string, execute: (...args: any[]) => void }[]): this {

      for (const { event, execute } of events) {
         this.on(event, execute);
      }
      return this;
   }

   public setOnPlayerEvent(events: { event: string, execute: (...args: any[]) => void }[]): this {
      for (const { event, execute } of events) {
         // this.player?.on(event, execute);
      }
      return this;
   }
}

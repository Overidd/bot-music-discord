import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { IConfigBot } from '../../doman/interface'
import DisTube from 'distube'

interface ICommand {
   name: string;
   description: string;
   execute: (interaction: any) => Promise<void>;
}

export class ClientDiscord extends Client {
   public config?: IConfigBot;
   public player?: DisTube;
   public command?: Collection<string, ICommand>;
   public language?: string;

   constructor() {
      super({
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
         ]
      })
   }

   public setCommand(command: Collection<string, any>): this {
      this.command = command;
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
}

import { Client, Collection, GatewayIntentBits } from 'discord.js'
import { IButton, ICommand, IConfigBot } from '../../../doman/types';
import { ControlPanelStatusEntity } from '../../../doman/entity';
import { ClientDistube } from './distube.';
import { DisTubeEvents } from 'distube'

export class ClientDiscord extends Client {
   public config?: IConfigBot;
   public player?: ClientDistube;
   public commands: Collection<string, ICommand> = new Collection();
   public buttons: Collection<string, IButton> = new Collection();
   public controlPanelStatus: Collection<string, ControlPanelStatusEntity> = new Collection()
   
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

   public setButtons(buttons: Collection<string, any>): this {
      this.buttons = buttons
      return this
   }

   public setConfig(configBot: IConfigBot): this {
      this.config = configBot;
      return this;
   }

   public setPlayer(player: ClientDistube): this {
      this.player = player;
      return this;
   }

   public setLanguage(language: string): this {
      this.language = language || 'es';
      return this;
   }

   public setOnceClientEvent(events: { name: string, execute: (...args: any[]) => void }[]): this {

      for (const { name, execute } of events) {
         this.once(name, execute);
      };
      return this;
   }

   public setOnClientEvent(events: { name: string, execute: (...args: any[]) => void }[]): this {

      for (const { name, execute } of events) {
         this.on(name, execute);
      }
      return this;
   }

   public setOnPlayerEvent(events: { name: string, execute: (...args: any[]) => void }[]): this {
      for (const { name, execute } of events) {
         console.log(name, execute);
         this.player?.on(name as keyof DisTubeEvents, (...args: any[]) => execute(this, ...args));
      }
      return this;
   }
}
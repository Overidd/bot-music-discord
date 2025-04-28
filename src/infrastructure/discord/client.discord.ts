import { Client, GatewayIntentBits } from 'discord.js'

export class ClientDiscord {
   static create(): Client<boolean> {
      return new Client({
         intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates,
         ]
      })
   }
}

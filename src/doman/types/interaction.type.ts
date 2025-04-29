import { GuildMember, Interaction } from 'discord.js';
import { ClientDiscord } from '../../infrastructure/discord';

export type CustonInteraction = Interaction & {
   client: ClientDiscord;
   member: GuildMember
};
// interaction.member as GuildMember
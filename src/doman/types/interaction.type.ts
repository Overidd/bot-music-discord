import { GuildMember, Interaction } from 'discord.js';
import { ClientDiscord } from '../../infrastructure/discord';

export type CustonInteraction = Interaction & {
   client: ClientDiscord;
   member: GuildMember
};
// interaction.member as GuildMember

export type ICommand = {
   data: { name: string, toJSON: () => any },
   execute: (...args: any[]) => any
};

export type IButton = {
   data: { name: string },
   execute: (...args: any[]) => any
};
import { Interaction } from 'discord.js';
import { ClientDiscord } from '../../infrastructure/discord';

export type CustonInteraction = Interaction & {
   client: ClientDiscord;
};
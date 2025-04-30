import { Events } from 'discord.js';
import { CustonInteraction } from '../../../doman/types';
import { ChannelHandler, GuildHandler, InteractionHandler } from '../../../application/handler';

const options = {
   name: Events.InteractionCreate,
   once: false
};

const execute = async (interaction: CustonInteraction) => {
   const guildHandler = new GuildHandler();
   const channelHandler = new ChannelHandler();
   const interactionHandler = new InteractionHandler();

   // try {
   guildHandler
      .setNext(channelHandler)
      .setNext(interactionHandler);

   await guildHandler
      .handle(interaction, {})

   // } catch (error) {
   // console.error(error);
   // }
};

export const event = {
   ...options,
   execute
};
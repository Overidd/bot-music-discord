import { Events } from 'discord.js';
import { ChannelHandler, GuildHandler, InteractionHandler } from '../../application/handler/interaction';
import { CustonInteraction } from '../../doman/types';

const options = {
   name: Events.InteractionCreate,
   once: false
};

const execute = async (interaction: CustonInteraction) => {
   const guildHandler = new GuildHandler();
   const channelHandler = new ChannelHandler();
   const interactionHandler = new InteractionHandler();

   guildHandler.setNext(channelHandler).setNext(interactionHandler)
   await guildHandler.handle(interaction, {})
};

export default {
   ...options,
   execute
};


import { Events } from 'discord.js';

const options = {
   name: Events.ClientReady,
   once: true
}

const execute = async (client: any) => {
   console.log(`¡Listo! Inicia sesión como ${client.user.tag}`);
}

export const event = {
   ...options,
   execute
}
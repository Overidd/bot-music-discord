import { MessageFlags } from 'discord.js';
import { CustonInteraction, EventButtons } from '../../doman/types';
import { EmdebComponent } from '../../infrastructure/discord';


const options = {
   data: {
      name: EventButtons.BTN_PAUSE.name,
   }
}



const execute = async (interaction: CustonInteraction) => {


   if (!interaction.isButton()) return;
   if (!interaction?.guildId) return

   const queue = interaction?.client?.player?.getQueue(interaction.guildId);

   console.log('queue?.isPaused', queue?.isPaused);

   try {
      if (!queue?.isPaused) {
         await interaction.reply({ content: `\`${EventButtons.BTN_PAUSE.emoji}\``, flags: MessageFlags.Ephemeral });
         return;
      }

      await queue.pause();
      await interaction.reply({ content: `\`${EventButtons.BTN_PAUSE.emoji}\``, flags: MessageFlags.Ephemeral });
   } catch (error) {
      await interaction.reply({
         embeds: [EmdebComponent.emdebError('Ocurrio un error al pausar la musica')],
         flags: MessageFlags.Ephemeral
      })
   }
}

export const button = {
   ...options,
   execute,
}


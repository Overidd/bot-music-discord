import { MessageFlags } from 'discord.js';
import { CustonInteraction, EventButtons } from '../../doman/types';
import { EmdebComponent } from '../../infrastructure/discord';

const options = {
   data: {
      name: EventButtons.BTN_MUTESONG.name,
   }
}

const execute = async (interaction: CustonInteraction) => {

   if (!interaction.isButton()) return;
   if (!interaction?.guildId) return

   const queue = interaction?.client?.player?.getQueue(interaction.guildId) as any;

   try {
      const metadata = queue?.metadata || {}
      metadata.previousVolume = queue?.volume || 40;
      console.log('metadata.previousVolume', metadata.previousVolume);
      await queue?.setVolume(0);
      await interaction.reply({ content: `\`${EventButtons.BTN_MUTESONG.emoji}\``, flags: MessageFlags.Ephemeral });
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

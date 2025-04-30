import { CustonInteraction, EventButtons } from "../../doman/types"


const options = {
   data: {
      name: EventButtons.BTN_BACK,
   }
}


const execute = async (interaction: CustonInteraction) => {

   if (!interaction.isButton()) return;
   if (!interaction?.guildId) return

   const queue = interaction?.client?.player?.getQueue(interaction.guildId);

   if (!queue?.playing) {
      await interaction.reply({
         content: 'No hay musica en la cola',
         ephemeral: true,
      });
      return;
   }

   await queue.previous();
   console.log('BTN_BACK');
}

export const button = {
   ...options,
   execute,
}

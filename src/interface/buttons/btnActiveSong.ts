import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';

const options = {
   data: {
      name: EventButtons.BTN_ACTIVESONG.name,
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   const res = await SongService.getInstance()
      .activeMusic(interaction);

   if (!res) return;

   interaction.reply({
      ...res.message,
   });
}

export const button = {
   ...options,
   execute,
}
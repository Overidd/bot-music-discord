import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';

const options = {
   data: {
      name: EventButtons.BTN_MUTESONG.name,
   }
}

const execute = async (interaction: CustonInteraction) => {
   if (!interaction.isButton()) return;

   const res = await SongService.getInstance()
      .muteMusic(interaction);

   if (!res) return;

   interaction.reply({
      ...res.message,
   });
}

export const button = {
   ...options,
   execute,
}

import { CustonInteraction, EventButtons } from '../../doman/types';
import { SongService } from '../../application/service';


const options = {
   data: {
      name: EventButtons.BTN_PAUSE.name,
   }
}

const execute = async (interaction: CustonInteraction) => {

   if (!interaction.isButton()) return;

   const res = await SongService.getInstance()
      .pause(interaction);

   if (!res) return;

   console.log({ res });

   interaction.reply({
      ...res.message,
   });
}

export const button = {
   ...options,
   execute,
}


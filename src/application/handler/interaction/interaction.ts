import { BaseInteractionHandler } from '../../../doman/handler';
import { CustonInteraction } from '../../../doman/types';

export class InteractionHandler extends BaseInteractionHandler {
   private interaction?: CustonInteraction

   constructor() {
      super()
   }

   override async handle(interaction: CustonInteraction): Promise<void> {
      this.interaction = interaction

      switch (true) {
         case interaction.isCommand():
            this.command()
            break;

         case interaction.isButton():
            this.button()
            break;

         default:
            break;
      }
      // await interaction.execute(interaction)

   }

   private async command() {
      if (!this.interaction?.isCommand()) return

      const command = this.interaction?.client.command?.get(this.interaction?.commandName)

      command?.execute(this.interaction)
   }

   private async button() {

   }
}
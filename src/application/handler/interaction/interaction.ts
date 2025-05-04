import { BaseInteractionHandler } from '../../../doman/handler';
import { CustonInteraction } from '../../../doman/types';

export class InteractionHandler extends BaseInteractionHandler {
   private interaction?: CustonInteraction

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
   }

   private async command() {
      if (!this.interaction?.isCommand()) return

      const command = this.interaction?.client.commands?.get(this.interaction?.commandName)

      command?.execute(this.interaction)
   }

   private async button() {
      if (!this.interaction?.isButton()) return

      const button = this.interaction?.client.buttons?.get(this.interaction?.customId)

      if (button?.setupPlayerListeners) {
         button?.setupPlayerListeners(this.interaction.client)
      }

      button?.execute(this.interaction)
   }
}
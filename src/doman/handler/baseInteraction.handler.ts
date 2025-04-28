import { CustonInteraction } from '../types';

abstract class InteractionHandler {
   abstract setNext(handler: InteractionHandler): InteractionHandler
   abstract handle(interaction: CustonInteraction, dataChannel: object): Promise<void>
}

export abstract class BaseInteractionHandler implements InteractionHandler {
   private nextHandler?: InteractionHandler;

   setNext(handler: InteractionHandler) {
      this.nextHandler = handler
      return handler
   }

   handle(interaction: CustonInteraction, dataChannel: object): Promise<void> {
      if (!this.nextHandler) return Promise.resolve();
      return this.nextHandler.handle(interaction, dataChannel)
   }
}
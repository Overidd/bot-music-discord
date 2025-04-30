import { BaseInteractionHandler } from '../../../doman/handler';
import { CustonInteraction } from '../../../doman/types';

export class ChannelHandler extends BaseInteractionHandler {

   override async handle(interaction: CustonInteraction, dataChannel: object): Promise<void> {



      await super.handle(interaction, dataChannel)
   }
}
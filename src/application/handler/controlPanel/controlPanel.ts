import { ClientDiscord } from '../../../infrastructure/discord';
import { ControlPanelStatusEntity } from '../../../doman/entity';

export class PanelStatusHandler {
   static create(client: ClientDiscord, entity: ControlPanelStatusEntity) {
      if (entity?.guildId && client.controlPanelStatus.has(entity.guildId)) return;

      client?.controlPanelStatus.set(
         entity.guildId!,
         entity
      )
   }

   static delete(client: ClientDiscord, guildId: string) {
      if (guildId && !client.controlPanelStatus.has(guildId)) return;

      const status = client.controlPanelStatus.get(guildId)

      status?.getRespon?.delete()

      client.controlPanelStatus.delete(guildId)
   }

   static get(client: ClientDiscord, guildId: string): ControlPanelStatusEntity | undefined {
      if (!guildId) {
         // throw new Error('No implement guildId')
      }
      if (!client.controlPanelStatus.has(guildId)) {
         // throw new Error('No implement controlPanelStatus')
      }

      return client.controlPanelStatus.get(guildId)
   }
}
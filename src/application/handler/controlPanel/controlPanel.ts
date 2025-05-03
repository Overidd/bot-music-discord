import { ClientDiscord } from '../../../infrastructure/discord';
import { IControlPanelStatus } from '../../../doman/types';

export class PanelStatusHandler {
   static create(client: ClientDiscord, data: IControlPanelStatus) {

      if (client.controlPanelStatus.has(data.guildId)) return;

      client?.controlPanelStatus.set(
         data.guildId,
         data
      )
   }

   static update(client: ClientDiscord, data: Partial<IControlPanelStatus>) {

      if (data.guildId && !client.controlPanelStatus.has(data.guildId)) return;

      const status = client.controlPanelStatus.get(data.guildId!)

      if (data.controlPanel) {
         status?.controlPanel.delete()
      }

      client.controlPanelStatus.delete(data.guildId!)

      client.controlPanelStatus.set(data.guildId!, {
         ...status!,
         ...data,
      })
   }

   static delete(client: ClientDiscord, guildId: string) {
      if (guildId && !client.controlPanelStatus.has(guildId)) return;

      const status = client.controlPanelStatus.get(guildId)

      status?.controlPanel.delete()
      client.controlPanelStatus.delete(guildId)
   }

   static edit(client: ClientDiscord, guildId: string): IControlPanelStatus {
      if (!guildId) {
         throw new Error('No implement guildId')
      }
      if (!client.controlPanelStatus.has(guildId)) {
         throw new Error('No implement controlPanelStatus')
      }

      return client.controlPanelStatus.get(guildId)!
   }
}
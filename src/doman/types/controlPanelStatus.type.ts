import { MessageEditOptions, MessagePayload } from 'discord.js';


export interface IControlPanelStatus {
   guildId: string,
   channelId: string,
   autorUserId?: string,
   isPause: boolean,
   isResume: boolean,
   isMuteSong: boolean,
   isActiveSong: boolean,
   volumen: number,
   controlPanel: {
      delete: () => void;
      edit: (content: string | MessageEditOptions | MessagePayload) => void;
      components: any[]
      embeds: any[]
   }
}
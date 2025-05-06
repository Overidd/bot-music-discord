import { IMessageRespons, InteractionRespons } from '../types';

interface props {
   lang: string;
   valume: number;
   guildId: string;
   channelId?: string;
   autorUserId?: string;
}

export class ControlPanelStatusEntity {
   private lang?: string;
   private valume?: number;
   private respon?: IMessageRespons | InteractionRespons;
   public guildId?: string;
   public channelId?: string; // ID del canal
   public autorUserId?: string; // ID del usuario que controla (opcional)
   public isActiveSong?: string;
   public isPlaying?: string;
   public isActiveLoop?: string;

   get getRespon() {
      return this.respon
   }

   get getValume() {
      return this.valume
   }

   get getLang() {
      return this.lang
   }

   set setterRespon(newRespon: IMessageRespons | InteractionRespons) {
      if (this.respon) {
         this.respon.delete()
      }
      this.respon = newRespon
   }

   setRespon(newRespon: IMessageRespons | InteractionRespons) {
      if (this.respon) {
         this.respon.delete()
      }
      this.respon = newRespon
      return this;
   }

   setValume(levelVolume: number) {
      this.valume = levelVolume
      return this;
   }

   setLang(lang: string) {
      this.lang = lang
      return this;
   }

   setData(data: props) {
      if (data.guildId) this.guildId = data.guildId;
      if (data.lang) this.lang = data.lang;
      if (data.valume) this.valume = data.valume;
      if (data.channelId) this.channelId = data.channelId;
      if (data.autorUserId) this.autorUserId = data.autorUserId;

      return this;
   }
}

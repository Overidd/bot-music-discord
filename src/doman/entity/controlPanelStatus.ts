import { CustonInteraction, IMessageRespons, InteractionRespons } from '../types';

interface Props {
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
   public channelId?: string;
   public autorUserId?: string;
   public isActiveSong?: string;
   public isPlaying?: string;
   public isActiveLoop?: string;
   public btnSkipInteraction?: CustonInteraction;
   public btnBackInteraction?: CustonInteraction;

   // Getters
   get getRespon() {
      return this.respon;
   }

   get getValume() {
      return this.valume;
   }

   get getLang() {
      return this.lang;
   }

   // Setters
   setRespon(newRespon: IMessageRespons | InteractionRespons) {
      if (this.respon) {
         try {
            this.respon.delete();
         } catch (error) {
            console.warn('Error al eliminar respuesta anterior:', error);
         }
      }
      this.respon = newRespon;
      return this;
   }

   async deleteRespon() {
      if (this.respon) {
         try {
            await this.respon.delete();
         } catch (error) {
            console.warn('Error al eliminar respuesta:', error);
         }
      }
      this.respon = undefined;
   }

   setValume(levelVolume: number) {
      this.valume = levelVolume;
      return this;
   }

   setLang(lang: string) {
      this.lang = lang;
      return this;
   }

   setBtnSkipInteraction(interaction: CustonInteraction) {
      this.btnSkipInteraction = interaction;
   }

   async deleteBtnSkipInteraction() {
      if (!this.btnSkipInteraction?.isButton()) {
         this.btnSkipInteraction = undefined;
         return;
      }

      try {
         if (this.btnSkipInteraction.replied || this.btnSkipInteraction.deferred) {
            await this.btnSkipInteraction.deleteReply();
         }
      } catch (error: any) {
         if (error.code !== 10008) { // Unknown Message
            console.error('Error al eliminar la respuesta del botón:', error);
         }
      } finally {
         this.btnSkipInteraction = undefined;
      }
   }

   setData(data: Props) {
      this.guildId = data.guildId;
      this.lang = data.lang;
      this.valume = data.valume;
      this.channelId = data.channelId;
      this.autorUserId = data.autorUserId;
      return this;
   }

   // Métodos futuros
   async setBtnBackInteraction(interaction: CustonInteraction) {
      this.btnBackInteraction = interaction;
   }

   async deleteBtnBackInteraction() {
      if (!this.btnBackInteraction?.isButton()) {
         this.btnBackInteraction = undefined;
         return;
      }
      try {
         if (this.btnBackInteraction.replied || this.btnBackInteraction.deferred) {
            await this.btnBackInteraction.deleteReply();
         }
      } catch (error: any) {
         if (error.code !== 10008) { // Unknown Message
            console.error('Error al eliminar la respuesta del botón:', error);
         }
      } finally {
         this.btnBackInteraction = undefined;
      }
      // implementar si necesario
   }
}

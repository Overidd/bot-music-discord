import { Queue } from 'distube';
import { MessageFlags } from 'discord.js';
import { EmdebComponent } from '../../infrastructure/discord';
import { CustonInteraction, EventButtons } from '../../doman/types';

interface ISendMessage {
   error: boolean;
   fetchReply: true,
   message: {
      embeds?: any;
      content?: string;
      flags: MessageFlags.Ephemeral;
   }
}

export class SongService {
   private static instance: SongService;
   constructor() { }

   public static getInstance(): SongService {
      if (!SongService.instance) {
         SongService.instance = new SongService();
      }
      return SongService.instance;
   }

   private validate(queue: Queue) {
      if (!queue || !queue.playing || queue.songs.length === 0) {
         return EmdebComponent.emdebError('⛔ No hay música reproduciéndose.')
      }
   }

   private sendMessage({ embeds, content, isError = false }: { embeds?: any, content?: string, isError: boolean }): ISendMessage {
      return {
         error: isError,
         message: {
            ...(embeds ? { embeds } : { content }),
            flags: MessageFlags.Ephemeral
         },
         fetchReply: true
      }
   }

   public async skip(interaction: CustonInteraction): Promise<ISendMessage | undefined> {
      if (!interaction.isButton()) return;
      try {
         const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

         const error = this.validate(queue);

         if (error) return this.sendMessage({ embeds: [error], isError: true });

         if (queue.songs.length <= 1) {
            return this.sendMessage({
               embeds: [EmdebComponent.emdebError('🚫 No hay más canciones para saltar.')],
               isError: true
            })
         }

         await queue.skip();

         return this.sendMessage({
            content: `\`${EventButtons.BTN_SKIP.emoji}\``,
            isError: false
         })

      } catch (e) {
         return this.sendMessage({
            embeds: [EmdebComponent.emdebError('Ocurrió un error al saltar la canción.')],
            isError: true
         })
      }
   }

   public async back(interaction: CustonInteraction): Promise<ISendMessage | undefined> {
      if (!interaction.isButton()) return;

      try {
         const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

         const error = this.validate(queue);

         if (error) return this.sendMessage({ embeds: [error], isError: true });

         if (!queue.previousSongs || queue.previousSongs.length === 0) {
            return this.sendMessage({
               embeds: [EmdebComponent.emdebError('🚫 No hay canción anterior en el historial.')],
               isError: true
            })
         }
         await queue.previous();
         return this.sendMessage({
            content: `\`${EventButtons.BTN_BACK.emoji}\``,
            isError: false
         })

      } catch (e) {
         return this.sendMessage({
            embeds: [EmdebComponent.emdebError('Ocurrió un error al retroceder la música.')],
            isError: true
         })
      }
   }

   public async pause(interaction: CustonInteraction): Promise<ISendMessage | undefined> {
      if (!interaction.isButton()) return;

      try {
         const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

         const error = this.validate(queue);

         if (error) return this.sendMessage({ embeds: [error], isError: true });

         if (!queue?.isPaused) {
            return this.sendMessage({
               content: `\`${EventButtons.BTN_PAUSE.emoji}\``,
               isError: false
            })
         }
         await queue.pause();

         return this.sendMessage({
            content: `\`${EventButtons.BTN_PAUSE.emoji}\``,
            isError: false
         })
      } catch (error) {
         return this.sendMessage({
            embeds: [EmdebComponent.emdebError('Ocurrio un error al pausar la musica')],
            isError: true
         })
      }
   }

   public async play(interaction: CustonInteraction): Promise<ISendMessage | undefined> {
      if (!interaction.isButton()) return;

      try {
         const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

         const error = this.validate(queue);

         if (error) return this.sendMessage({ embeds: [error], isError: true });

         if (!queue?.isPaused) {
            return this.sendMessage({
               content: `\`${EventButtons.BTN_PLAY.emoji}\``,
               isError: false
            })
         }
         await queue.resume();

         return this.sendMessage({
            content: `\`${EventButtons.BTN_PLAY.emoji}\``,
            isError: false
         })
      } catch (error) {
         return this.sendMessage({
            embeds: [EmdebComponent.emdebError('Ocurrió un error.')],
            isError: true
         })
      }
   }

   public async stop(interaction: CustonInteraction): Promise<ISendMessage | undefined> {
      if (!interaction.isButton()) return;

      try {
         const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

         const error = this.validate(queue);

         if (error) return this.sendMessage({ embeds: [error], isError: true });

         if (!queue?.isPaused) {
            return this.sendMessage({
               content: `\`⏹️ Música detenida ${EventButtons.BTN_STOP.emoji}\``,
               isError: false
            })
         }
         await queue.stop();

         return this.sendMessage({
            content: `\`⏹️ Música detenida ${EventButtons.BTN_STOP.emoji}\``,
            isError: false
         })
      } catch (error) {
         return this.sendMessage({
            embeds: [EmdebComponent.emdebError('Ocurrió un error al detener.')],
            isError: true
         })
      }
   }

   public async activeMusic(interaction: CustonInteraction): Promise<ISendMessage | undefined> {
      if (!interaction.isButton()) return;

      try {
         const queue = interaction.client?.player?.getQueue(interaction.guildId!) as any;
         // queue?.volume
         const error = this.validate(queue);

         if (error) return this.sendMessage({ embeds: [error], isError: true });

         if (!queue?.isPaused) {
            return this.sendMessage({
               content: `\`${EventButtons.BTN_ACTIVESONG.emoji}\``,
               isError: false
            })
         }

         const metadata = queue?.metadata || {}
         console.log('metadata.previousVolume', metadata);
         await queue.setVolume(metadata.previousVolume ?? 50);
         return this.sendMessage({
            content: `\`${EventButtons.BTN_ACTIVESONG.emoji}\``,
            isError: false
         })
      } catch (error) {
         return this.sendMessage({
            embeds: [EmdebComponent.emdebError('Ocurrio un error al activar la musica')],
            isError: true
         })
      }
   }

   public async muteMusic(interaction: CustonInteraction): Promise<ISendMessage | undefined> {
      if (!interaction.isButton()) return;

      try {
         const queue = interaction.client?.player?.getQueue(interaction.guildId!) as any;

         const error = this.validate(queue);

         if (error) return this.sendMessage({ embeds: [error], isError: true });

         if (!queue?.isPaused) {
            return this.sendMessage({
               content: `\`${EventButtons.BTN_MUTESONG.emoji}\``,
               isError: false
            })
         }
         await queue.setVolume(0);
         return this.sendMessage({
            content: `\`${EventButtons.BTN_MUTESONG.emoji}\``,
            isError: false
         })
      } catch (error) {
         return this.sendMessage({
            embeds: [EmdebComponent.emdebError('Ocurrio un error al mutar la musica')],
            isError: true
         })
      }
   }
}
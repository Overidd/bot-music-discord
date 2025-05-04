import { Queue } from 'distube';
import { CustonInteraction } from '../../doman/types';
import { CustonError } from '../../doman/error';

export class SongService {
   private static instance: SongService;
   constructor() { }

   public static getInstance(): SongService {
      if (!SongService.instance) {
         SongService.instance = new SongService();
      }
      return SongService.instance;
   }

   private validate(queue?: Queue) {
      if (!queue || !queue.playing || queue.songs.length === 0) {
         throw CustonError.validation('⛔ No hay música reproduciéndose.');
      }
   }

   public async skip(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

      this.validate(queue);

      if (queue.songs.length <= 1) {
         throw CustonError.validation('⛔ No hay más canciones en la cola para saltar.');
      }

      await queue.skip();
   }

   public async back(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

      this.validate(queue);

      if (!queue.previousSongs || queue.previousSongs.length === 0) {
         throw CustonError.validation('⛔ No hay canción anterior en el historial.');
      }
      await queue.previous();
   }

   public async pause(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

      this.validate(queue);

      if (!queue?.isPaused) return;

      await queue.pause();
   }

   public async play(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

      this.validate(queue);

      if (!queue?.isPaused) {
         return;
      }

      await queue.resume();
   }

   public async stop(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!) as Queue;

      this.validate(queue);

      if (!queue?.isPaused) {
         return
      }
      await queue.stop();
   }

   public async activeMusic(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!) as any;
      // queue?.volume
      this.validate(queue);

      if (!queue?.isPaused) {
         return;
      }

      await queue.setVolume(50);
   }

   public async activeLoopMusic(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!);

      this.validate(queue);

      await queue?.setRepeatMode(2);
   }

   public async desactiveLoopMusic(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!);

      this.validate(queue);

      await queue?.setRepeatMode(0);
   }

   public async muteMusic(interaction: CustonInteraction) {
      if (!interaction.isButton()) return;

      const queue = interaction.client?.player?.getQueue(interaction.guildId!) as any;

      this.validate(queue);

      if (!queue?.isPaused) {
         return;
      }
      await queue.setVolume(0);
   }
}
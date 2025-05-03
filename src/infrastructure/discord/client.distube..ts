import { DisTube, DisTubeOptions, DisTubePlugin, PlayOptions } from 'distube';
import { Client, VoiceChannel, TextChannel, GuildMember } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import { ChildProcess, spawn } from 'child_process';
// import { YtDlpPlugin } from '@distube/yt-dlp';
// import { YouTubePlugin } from '@distube/youtube';

interface IDistubeClient {
   client: Client<boolean>;
   ffmpegPath: string;
   plugins: any[];
}

// Variable compartida para el último proceso
let lastYtdlpProc: ChildProcess | null = null;

// // Patch del plugin
// const ytDlpPlugin = new YtDlpPlugin({ update: false });
// const originalSpawn = (ytDlpPlugin as any)._spawn as (args: string[]) => ChildProcess;

// ; (ytDlpPlugin as any)._spawn = function (this: any, args: string[]) {
//    const proc = originalSpawn.call(this, args);
//    lastYtdlpProc = proc;
//    return proc;
// };

export class ClientDistube extends DisTube {
   constructor({ client, ffmpegPath, plugins }: IDistubeClient) {
      const opts: DisTubeOptions = {
         emitNewSongOnly: true,
         emitAddSongWhenCreatingQueue: false,
         emitAddListWhenCreatingQueue: false,
         ffmpeg: { path: ffmpegPath },
         plugins: plugins,
      };
      super(client, opts);
   }

   async playWithTimeout(
      voiceChannel: VoiceChannel,
      query: string,
      options: PlayOptions & { member: GuildMember; textChannel: TextChannel }
   ): Promise<void> {
      const playPromise = this.play(voiceChannel, query, options);
      let timer: NodeJS.Timeout | undefined;

      const timeoutPromise = new Promise<never>((_, reject) => {
         timer = setTimeout(() => reject(new Error('TIMEOUT_NO_RESULT')), 30_000);
      });

      try {
         await Promise.race([playPromise, timeoutPromise]);
      } catch (err) {
         // 1) Desconecta
         const conn = getVoiceConnection(options.member.guild.id);
         if (conn) conn.destroy();

         // 2) Vacía la cola
         this.stop(options.member.guild.id);

         // 3) Matar proceso yt-dlp si sigue vivo
         if (lastYtdlpProc && !lastYtdlpProc.killed) {
            lastYtdlpProc.kill('SIGKILL');
         }

         throw err;
      } finally {
         if (timer) clearTimeout(timer);
      }
   }
}

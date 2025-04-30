import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { ClientDiscord, DistubeClient } from './infrastructure/discord';
import { CommandFileLoader, EventFileLoader } from './infrastructure/fileLoader';
import { configBot } from './config';

const main = async () => {
   const client = new ClientDiscord();
   const distube = new DistubeClient({
      client,
      ffmpegPath: ffmpegPath.path,
      plugins: [
         new SpotifyPlugin(),
         new SoundCloudPlugin(),
         new YtDlpPlugin(),
      ]
   });

   const commands = await new CommandFileLoader(configBot)
      .loadCommands();
   const events = await new EventFileLoader(configBot)
      .loadEvents();

   client.setCommand(commands)
      .setConfig(configBot)
      .setPlayer(distube)
      .setOnceClientEvent(events.onceClientEvents)
      .setOnClientEvent(events.onClientEvents)
      .setOnPlayerEvent(events.onPlayerEvents)
      .login(configBot.TOKEN);
}

(async () => {
   await main();
})();








/**
 📋 Propiedades comunes de Queue:

Propiedad	Tipo	Descripción
songs	Song[]	Todas las canciones en la cola.
playing	boolean	Si está reproduciendo actualmente.
paused	boolean	Si está pausado.
volume	number	Volumen (0–100).
repeatMode	number	Modo de repetición (0 = off, 1 = canción, 2 = cola).
textChannel	`TextChannel	null`
voiceChannel	`VoiceChannel	StageChannel`
connection	VoiceConnection	Conexión de voz activa.
filters	string[]	Filtros de audio activos.
playingSince	number (timestamp)	Tiempo desde que empezó la canción actual.
previousSongs	Song[]	Historial de canciones.
autoplay	boolean	Si el autoplay está activado.
metadata	any	Datos personalizados que puedes adjuntar.
duration	number	Duración total de la cola.
🎵 song: Song — Representa una canción individual
Importación:

ts
Copiar
Editar
import type { Song } from "distube";
📋 Propiedades comunes de Song:

Propiedad	Tipo	Descripción
name	string	Nombre de la canción.
url	string	URL del video o fuente.
id	string	ID del video.
duration	number	Duración en segundos.
formattedDuration	string	Duración como texto (mm:ss).
thumbnail	string	URL de miniatura.
views	number	Cantidad de vistas.
likes	number	Cantidad de likes.
isLive	boolean	Si es un stream en vivo.
user	GuildMember	Usuario que solicitó la canción.
source	string	Fuente (youtube, spotify, etc).
streamURL	string	URL directa para reproducir.
related	Song[]	Canciones relacionadas (sugeridas).
member	GuildMember	Alias de user.
 */
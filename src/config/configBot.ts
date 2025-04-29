
import { IConfigBot } from '../doman/types';
import { ENV } from './env';


export const configBot: IConfigBot = {
   TOKEN: ENV.TOKEN_SECRET_BOT,
   ownerID: [ENV.GUILD_ID_SERVER], //escribe tu ID de usuario de Discord. Ejemplo: ["id"] o ["id1","id2"]
   pathCommands: './src/interface/commands',
   pathEvents: './src/interface/events',
   webBotInvite: 'botInvite',
   supportServer: 'supportServer',
   mongodbURL: 'mongodb://admin:adminpassword@localhost:27017',
   status: 'Bot Online ✅',
   language: 'es',

   playlistSettings: {
      maxPlaylist: 10, //número máximo de listas de reproducción
      maxMusic: 75, //número máximo de músicas en una lista de reproducción
   },

   voiceConfig: {
      maxVol: 200, //Puede especificar el nivel de volumen máximo.

      leaveOnFinish: false, //Si esta variable es "verdadera", el bot abandonará el canal cuando termine la música.

      leaveOnStop: false, //Si esta variable es "verdadera", el bot abandonará el canal cuando se detenga la música.

      leaveOnEmpty: { //La variable leaveOnEnd debe ser "falsa" para utilizar este sistema.
         status: true, //Si esta variable es "verdadera", el bot abandonará el canal cuando esté desconectado.
         cooldown: 10000000, // los segundos en desconectarse. despues de que termine la musica 1000 = 1 segundo
      },

   },

   voteManager: {
      status: false, //true or false
      api_key: '',//API top.gg para votos de bots.
      vote_commands: ['back', 'channel', 'clear', 'dj', 'filter', 'loop', 'nowplaying', 'pause', 'play', 'playlist', 'queue', 'resume', 'save', 'search', 'skip', 'stop', 'time', 'volume'],
      vote_url: '', //Escribe la URL de tu votación top.gg.
   },

   shardManager: {
      shardStatus: false //Si el bot existe en más de 1000 servidores, cambie esta parte a verdadero.
   },
}

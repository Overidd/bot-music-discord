export interface IConfigBot {
   TOKEN: string;
   ownerID: string[];
   webBotInvite: string;
   supportServer: string;
   mongodbURL: string;
   status: string;
   language: string;
   pathCommands: string;
   pathEvents: string;

   playlistSettings: {
      maxPlaylist: number;
      maxMusic: number;
   };

   voiceConfig: {
      maxVol: Number;
      leaveOnFinish: Boolean;
      leaveOnStop: Boolean,
      leaveOnEmpty: {
         status: Boolean,
         cooldown: Number,
      },
   };

   voteManager: {
      status: Boolean,
      api_key?: string,
      vote_commands: String[],
      vote_url: String,
   },

   shardManager: {
      shardStatus: Boolean
   },
}


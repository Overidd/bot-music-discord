type EmbedSubTypeConfig = {
   emoji: string;
};

type EmbedCategoryConfig = {
   color: string;
   emoji?: string,
   types: Record<string, EmbedSubTypeConfig>;
   value: (emoji: string, text: string, value?: string) => string;
};

export const embedComponentConfig: Record<string, EmbedCategoryConfig> = {
   error: {
      color: '#fb3823',
      types: {
         errorNotPlaying: {
            emoji: '⛔'
         },
         errorNoQueueToSkip: {
            emoji: '⏭️'
         },
         errorNoHistoryToBack: {
            emoji: '⏮️'
         },
         errro500: {
            emoji: '💥'
         },
         errorHasVoiceChannel: {
            emoji: '🔊'
         },
         errorHasWriteTheNameMusic: {
            emoji: '✍️'
         },
         errorNotTextChannel: {
            emoji: '📴'
         },
      },
      value: (emoji, text) => `${emoji} ${text}`,
   },

   warning: {
      color: '#fb3823',
      types: {},
      value: (emoji, text) => `${emoji} ${text}`,
   },

   success: {
      color: '#5865f2',
      types: {
         successFinished: {
            emoji: '🎵'
         },
      },
      value: (emoji, text) => `${emoji} ${text}`,
   },

   settingVolumen: {
      color: '#5865f2',
      emoji: '🔊',
      types: {},
      value: (emoji, text, value) => `${emoji} ${text}: \`[${value}%]\``,
   },

   settingLanguaje: {
      color: '#5865f2',
      emoji: '💬',
      types: {},
      value: (emoji, text, value) => `${emoji} ${text}: [${value}]`,
   },
};

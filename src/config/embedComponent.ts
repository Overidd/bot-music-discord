

export const embedComponentConfig = {

   error: {
      color: '#fb3823',
      value: (text: string) => `\`⛔ ${text}\``,
   },

   success: {
      color: '#5865f2',
      value: (text: string) => `\` ${text}\``,
   },

   warning: {
      color: '#ffc107',
      value: (text: string) => `\`⚠️ ${text}\``,
   },
   settingVolumen: {
      color: '#5865f2',
      value: (textlang: string, value: string) => `**🔊 ${textlang}**: \`[${value}%]\``,
   },

   settingLanguaje: {
      color: '#5865f2',
      value: (textlang: string, value: string) => `**${textlang}**: [${value}]`,
   }
}
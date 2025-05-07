
export const ConfigFoundComponent = {
   color: '#5865f2',

   foundNameAutor: {
      label: '',
      maxLength: 25,
      ellipsis: '...',
      canShowIconUrl: true,
   }, // agredo:

   field: {
      autor: '',
      duration: '',
      source: '',
   },

   nameAutorFormat: (key: string, value: string) => `${key}: ${value}`,
   fieldFormat: (key: string, value: string) => `• ${key}: **${value}**`,
} 
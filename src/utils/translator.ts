import cloneDeep from 'lodash/cloneDeep';

export const dictionarys = {
   es: {
      nameAutor: 'Panel de control',
      duration: 'Duración',
      volume: 'Volumen',
      quantityInQueue: 'En cola',
      btnBack: 'Atrás',
      btnPause: 'Pausa',
      btnPlay: 'Reproducir',
      btnSkip: 'Saltar',
      btnStop: 'Detener',
      btnLoopDesactive: 'Desactivar Loop',
      btnLoopActive: 'Activar Loop',
      btnMuteSong: 'Silenciar',
      btnActiveSong: 'Activar',
      btnPlaylist: 'Playlist',
      actionActivateSong: 'Activado por',
      actionMuteSong: 'Muteado por',
      actionLoopActive: 'Loop activado por',
      actionLoopDisactive: 'Loop desactivado por',
   },
   en: {
      nameAutor: 'Control panel',
      duration: 'Duration',
      volume: 'Volume',
      quantityInQueue: 'In queue',
      btnBack: 'Back',
      btnPause: 'Pause',
      btnPlay: 'Play',
      btnSkip: 'Skip',
      btnStop: 'Stop',
      btnLoopDesactive: 'Deactivate Loop',
      btnLoopActive: 'Activate Loop',
      btnMuteSong: 'Mute',
      btnActiveSong: 'Activate',
      btnPlaylist: 'Playlist',
      actionActivateSong: 'Activated by',
      actionMuteSong: 'Muted by',
      actionLoopActive: 'Loop activated by',
      actionLoopDisactive: 'Loop deactivated by',
   }
} as const;


export type LangCode = keyof typeof dictionarys;

export class Translator {
   private lang?: LangCode;
   private dictionary: { [key: string]: string } = {};

   constructor() { }

   setLang(lang: LangCode) {
      this.lang = lang;
      this.dictionary = dictionarys[lang as LangCode];
      return this;
   }

   private traverseObject(object: { [key: string]: any }) {
      Object.entries(object).forEach(([key, value]) => {
         if (!this.dictionary.hasOwnProperty(key)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
               return this.traverseObject(value);
            }
            return;
         };

         if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            if (!value.hasOwnProperty('label')) return;
            value['label'] += this.t(key);
            return;
         }
         if (typeof value !== 'string') return;
         object[key] += this.t(key);
      })
   }

   object(object: { [key: string]: any }) {
      if (!Object.keys(this.dictionary).length) throw new Error('No dictionary');
      if (!this.lang) throw new Error('No lang');

      const copyObject = cloneDeep(object);
      this.traverseObject(copyObject);
      return copyObject;
   }

   /**
    * Traduce una clave con soporte de fallback e interpolación
    * @param key Clave a traducir
    * @param vars Variables a interpolar (opcional)
    * @returns Texto traducido
    */
   t(key: string, vars?: Record<string, string | number>): string {
      if (!this.lang) throw new Error('No lang');

      const template = this.dictionary[key as keyof typeof this.dictionary] ?? key;

      return this.interpolate(template, vars);
   }

   private interpolate(template: string, vars?: Record<string, string | number>): string {
      if (!vars) return template;

      return template.replace(/{{\s*(\w+)\s*}}/g, (_, varName) =>
         vars[varName] !== undefined ? String(vars[varName]) : `{{${varName}}}`
      );
   }
}

import cloneDeep from 'lodash/cloneDeep';

export const dictionarys = {
   es: {
      foundNameAutor: 'Agregado',
      volume: 'Volumen',
      autor: 'Autor',
      source: 'Fuente',
      nameAutor: 'Panel de control',
      duration: 'Duración',
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
      errorNotPlaying: 'No hay música reproduciéndose',
      errorNoQueueToSkip: 'No hay más canciones en la cola para saltar',
      errorNoHistoryToBack: 'No hay canción anterior en el historial.',
      errorHasVoiceChannel: 'Debes estar en un canal de voz',
      errorHasWriteTheNameMusic: 'Por favor escribe un nombre de música',
      errorNotTextChannel: 'No se pudo encontrar un canal de texto.',
      errro500: 'Ocurrio un error del servidor',
      success: '',
      successFinished: 'Finalizado',
      warning: '',
      settingVolumen: 'Volumen ajustado',
      settingLanguaje: 'Se cambio de idoma a'
   },
   en: {
      foundNameAutor: 'Added',
      volume: 'Volume',
      autor: 'Author',
      source: 'Source',
      nameAutor: 'Control Panel',
      duration: 'Duration',
      quantityInQueue: 'In queue',
      btnBack: 'Back',
      btnPause: 'Pause',
      btnPlay: 'Play',
      btnSkip: 'Skip',
      btnStop: 'Stop',
      btnLoopDesactive: 'Disable Loop',
      btnLoopActive: 'Enable Loop',
      btnMuteSong: 'Mute',
      btnActiveSong: 'Activate',
      btnPlaylist: 'Playlist',
      actionActivateSong: 'Activated by',
      actionMuteSong: 'Muted by',
      actionLoopActive: 'Loop enabled by',
      actionLoopDisactive: 'Loop disabled by',
      errorNotPlaying: 'No music is playing',
      errorNoQueueToSkip: 'No more songs in the queue to skip',
      errorNoHistoryToBack: 'No previous song in the history.',
      errorHasVoiceChannel: 'You must be in a voice channel',
      errorHasWriteTheNameMusic: 'Please write a song name',
      errorNotTextChannel: 'A text channel could not be found.',
      errro500: 'A server error occurred',
      success: '',
      successFinished: 'Finished',
      warning: '',
      settingVolumen: 'Volume adjusted',
      settingLanguaje: 'Language changed to'
   }
} as const;


export type LangCode = keyof typeof dictionarys;
export type typeErrorLang = 'errorNotPlaying' | 'errorNoQueueToSkip' | 'errorNoHistoryToBack' | 'errro500' | 'errorHasVoiceChannel' | 'errorHasWriteTheNameMusic' | 'errorNotTextChannel';
export type typeSuccessLag = 'successFinished'
export type typeWarning = '';

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

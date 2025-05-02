import { ButtonStyle } from "discord.js"

export const EventButtons = {
   BTN_BACK: {
      name: 'btnBack',
      emoji: '⏪',
      label: 'Atras',
      style: 1,
   },
   BTN_PAUSE: {
      name: 'btnPause',
      emoji: '⏸️',
      label: undefined, // 'Pausar'
      style: 1,
   },
   BTN_SKIP: {
      name: 'btnSkip',
      emoji: '⏩',
      label: 'Adelantar',
      style: 1,
   },
   BTN_PLAY: {
      name: 'btnPlay',
      emoji: '▶️',
      label: undefined, // 'Play'
      style: 1,
   },
   BTN_STOP: {
      name: 'btnStop',
      emoji: '⏹️',
      label: 'Detener',
      style: 4,
   },
   BTN_MUTESONG: {
      name: 'btnMuteSong',
      emoji: '🔇',
      label: 'Silenciar',
      style: 2,
   },
   BTN_ACTIVESONG: {
      name: 'btnActiveSong',
      emoji: '🔊',
      label: 'Activar',
      style: 2,
   },
   BTN_PLAYLIST: {
      name: 'btnPlaylist',
      emoji: '📃',
      label: 'Lista de reproduce',
      style: 2,
   },
}
export interface IButtonBasic {
   name: string,
   emoji: string,
   label?: string,
   style: number,
}

export const dataButtons: IButtonBasic[] = [
   {
      name: 'btnBack',
      emoji: '⏪',
      label: undefined, // Regresar
      style: 1,
   },
   {
      name: 'btnPause',
      emoji: '⏸️',
      label: undefined, // Pausar
      style: 1,
   },
   {
      name: 'btnPlay',
      emoji: '▶️',
      label: undefined, // 'Play'
      style: 1,
   },
   {
      name: 'btnSkip',
      emoji: '⏩',
      label: undefined, // 'Adelantar'
      style: 1,
   },
   {
      name: 'btnStop',
      emoji: '⏹️',
      label: undefined, // 'Detener'
      style: 4,
   },
   {
      name: 'btnMuteSong',
      emoji: '🔇',
      label: 'Silenciar',
      style: 2,
   },
   {
      name: 'btnActiveSong',
      emoji: '🔊',
      label: 'Activar',
      style: 2,
   },
   {
      name: 'btnPlaylist',
      emoji: '📃',
      label: 'Lista de reproduce',
      style: 2,
   },
]
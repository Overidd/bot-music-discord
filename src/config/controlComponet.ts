import { EventButtons } from '../doman/types'

export const configControlComponet = {
   embed: {
      color: '#5865f2',
      title: (text: string) => `\`🎵 ${text}\``,
      description: (text: string) => `\` ${text} \``,
      nameAutor: '', // Panel de control

      field: {
         duration: {
            label: '⏱️  ',
            value: (text: string) => `\`   ${text}   \``
         },
         volume: {
            label: '🔊 ',
            value: (text: string) => {
               const simbol = text.includes('live') ? '🔴' : '%'
               return `\`   ${text} ${simbol}   \``
            },
         },
         quantityInQueue: {
            label: '📃 ',
            value: (text: string) => `\`   ${text}   \``
         }
      }
   },

   buttons: {
      btnBack: {
         name: EventButtons.BTN_BACK,
         emoji: '⏪',
         canShowLabel: false,
         label: '',
         style: 1,
      },
      btnPause: {
         name: EventButtons.BTN_PAUSE,
         emoji: '⏸️',
         canShowLabel: false,
         label: '',
         style: 1,
      },
      btnPlay: {
         name: EventButtons.BTN_PLAY,
         emoji: '▶️',
         canShowLabel: false,
         label: '',
         style: 1,
      },
      btnSkip: {
         name: EventButtons.BTN_SKIP,
         emoji: '⏩',
         canShowLabel: false,
         label: '',
         style: 1,
      },
      btnStop: {
         name: EventButtons.BTN_STOP,
         emoji: '⏹️',
         canShowLabel: false,
         label: '',
         style: 4,
      },
      btnLoopDesactive: {
         name: EventButtons.BTN_LOOPDISACTIVE,
         emoji: '🔂',
         canShowLabel: false,
         label: '',
         style: 2,
      },
      btnLoopActive: {
         name: EventButtons.BTN_LOOPACTIVE,
         emoji: '🔁',
         canShowLabel: false,
         label: '',
         style: 3,
      },
      btnMuteSong: {
         name: EventButtons.BTN_MUTESONG,
         emoji: '🔇',
         canShowLabel: false,
         label: '',
         style: 2,
      },
      btnActiveSong: {
         name: EventButtons.BTN_ACTIVESONG,
         emoji: '🔊',
         canShowLabel: true,
         label: '',
         style: 2,
      },
      btnPlaylist: {
         name: EventButtons.BTN_PLAYLIST,
         emoji: '📃',
         canShowLabel: true,
         label: '',
         style: 2,
      },
   }
}


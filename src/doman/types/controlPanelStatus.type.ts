import { ActionRow, ButtonComponent, Embed, InteractionResponse, Message } from 'discord.js';

// components: ActionRow<ButtonComponent>[]; // Representa filas de botones en Discord
// embeds: Embed[]; // Representa los embeds en Discord
export interface IMessageRespons extends Message<boolean> {
   components: any[]; // Representa filas de botones en Discord
   embeds: Embed[]; // Representa los embeds en Discord
}

export interface InteractionRespons extends InteractionResponse<boolean> {
   components: ActionRow<ButtonComponent>[]; // Representa filas de botones en Discord
   embeds: Embed[]; // Representa los embeds en Discord
}

export interface IControlPanelStatus {
   guildId: string; // ID del servidor
   channelId?: string; // ID del canal
   autorUserId?: string; // ID del usuario que controla (opcional)
   isPause?: boolean; // Indica si está pausado
   isResume?: boolean; // Indica si está reanudado
   isMuteSong?: boolean; // Indica si la canción está silenciada
   isActiveSong?: boolean; // Indica si hay una canción activa
   volumen?: number; // Volumen actual
   controlPanel: IMessageRespons | InteractionRespons; // Panel de control
}

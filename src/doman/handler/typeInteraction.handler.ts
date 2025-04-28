// import { Interaction, ChatInputCommandInteraction, ButtonInteraction, SelectMenuInteraction } from 'discord.js';
// import { Iinteraction } from '../types';

// export abstract class TypeInteractionHandler<T extends Interaction> {
//    abstract execute(interaction: T): Promise<void>;
// }

// class CommandHandler extends TypeInteractionHandler<ChatInputCommandInteraction> {
//    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
//       // Aquí interaction está tipado como comando

//       console.log(interaction.commandName);
//    }
// }

// class ButtonHandler extends TypeInteractionHandler<ButtonInteraction> {
//    async execute(interaction: ButtonInteraction): Promise<void> {
//       // Aquí interaction está tipado como botón
//       console.log(interaction.customId);
//    }
// }

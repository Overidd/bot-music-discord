import { InteractionResponse } from 'discord.js';
import { IMessageRespons } from '../doman/types';


export class Timeout {

   static async delete(response: IMessageRespons | InteractionResponse, time: number = 2_000): Promise<boolean> {
      return await new Promise((resolve) => {
         const timeout = setTimeout(async () => {
            response.delete().catch((error) => {
               console.log('Error al eliminar el mensaje: ', error);
            });
            resolve(true);
            clearTimeout(timeout);
         }, time);
      })
   }
}
import { typeErrorLang } from '../../utils';


export class CustonError extends Error {
   lang?: string;
   typeMessage: string;
   constructor(typeMessage: string, lang?: string) {
      super(typeMessage);
      this.lang = lang;
      this.typeMessage = typeMessage;
   }

   public static validation(typeMessage: typeErrorLang, lang?: string) {
      return new CustonError(typeMessage, lang);
   }
   public static notFound(typeMessage: string, lang?: string) {
      return new CustonError(typeMessage, lang);
   }
   public static notAllowed(typeMessage: string, lang?: string) {
      return new CustonError(typeMessage, lang);
   }
   public static notImplemented(typeMessage: string, lang?: string) {
      return new CustonError(typeMessage, lang);
   }
}


export class CustonError extends Error {
   constructor(message: string) {
      super(message);
   }

   public static validation(message: string) {
      return new CustonError(message);
   }
   public static notFound(message: string) {
      return new CustonError(message);
   }
   public static notAllowed(message: string) {
      return new CustonError(message);
   }
   public static notImplemented(message: string) {
      return new CustonError(message);
   }
}

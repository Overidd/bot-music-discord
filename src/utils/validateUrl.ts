

export class ValidateUrl {

   static baseHttp(url?: string): Boolean {
      if (url && typeof url === 'string' && url.startsWith('http')) {
         return true
      }

      return false
   }

}

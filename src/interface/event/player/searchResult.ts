import { Events } from "distube";

const options = {
   // name: 'searchResult',
   name: 'searchResult',
   once: false
}

const execute = async (client: any, message: any, query: any, results: any) => {

   console.log({ message, query, results });
}

export const event = {
   ...options,
   execute
}
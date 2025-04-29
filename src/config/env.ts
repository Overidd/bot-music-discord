import 'dotenv/config';
import env from 'env-var';

export const ENV = {
   TOKEN_SECRET_BOT: env.get('TOKEN_SECRET_BOT').required().asString(),
   CLIENT_ID_BOT: env.get('CLIENT_ID_BOT').required().asString(),
   GUILD_ID_SERVER: env.get('GUILD_ID_SERVER').required().asString(),
}
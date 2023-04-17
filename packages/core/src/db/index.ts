import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';
import { Config } from 'sst/node/config';
import { fetch } from 'undici';
import { DeviceToken } from './interfaces/device_token';

interface Database {
  device_tokens: DeviceToken;
  notification_settings: NotificationSettings;
}

// Connect using a DATABASE_URL, provide a fetch implementation
export const db = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    host: Config.DB_HOST,
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    fetch,
  }),
});

export { DeviceToken } from './interfaces/device_token';

import { Kysely, PostgresDialect } from 'kysely';
import { Config } from 'sst/node/config';
import { DeviceToken } from './interfaces/device_token';
import { Pool } from 'pg';

interface Database {
  'whiskey-push-notifications.device_tokens': DeviceToken;
  'whiskey-push-notifications.notification_settings': NotificationSettings;
}

// Connect using a DATABASE_URL, provide a fetch implementation
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: Config.DB_HOST,
      database: Config.DB_NAME,
      user: Config.DB_USERNAME,
      password: Config.DB_PASSWORD,
    }),
  }),
});

export { DeviceToken } from './interfaces/device_token';

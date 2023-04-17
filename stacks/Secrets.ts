import { Config, StackContext } from 'sst/constructs';

export const Secrets = ({ stack }: StackContext) => {
  const DB_NAME = new Config.Secret(stack, 'DB_NAME');
  const DB_USERNAME = new Config.Secret(stack, 'DB_USERNAME');
  const DB_HOST = new Config.Secret(stack, 'DB_HOST');
  const DB_PASSWORD = new Config.Secret(stack, 'DB_PASSWORD');

  const AUTH_BASE_URL = new Config.Secret(stack, 'AUTH_BASE_URL');

  const IOS_APP_ID = new Config.Secret(stack, 'IOS_APP_ID');
  const APPLE_TEAM_ID = new Config.Secret(stack, 'APPLE_TEAM_ID');
  const PUSH_KEY_ID = new Config.Secret(stack, 'PUSH_KEY_ID');
  const PUSH_KEY = new Config.Secret(stack, 'PUSH_KEY');

  return {
    DB_NAME,
    DB_USERNAME,
    DB_HOST,
    DB_PASSWORD,

    AUTH_BASE_URL,

    IOS_APP_ID,
    APPLE_TEAM_ID,
    PUSH_KEY_ID,
    PUSH_KEY,
  };
};

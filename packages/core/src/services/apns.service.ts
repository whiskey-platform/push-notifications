import { Config } from 'sst/node/config';
import { Service } from 'typedi';
import { logger } from '../utils';
import { APNSConfig, NotificationBody } from '@push-notifications/defs';
import { JwtHeader, JwtPayload, sign } from 'jsonwebtoken';
import { Notification, Provider } from '@parse/node-apn';

const defaultConfig: APNSConfig = {
  pushType: 'alert',
  expiration: 0,
  priority: 10,
};

const apnProvider = new Provider({
  token: {
    key: Config.PUSH_KEY,
    keyId: Config.PUSH_KEY_ID,
    teamId: Config.APPLE_TEAM_ID,
  },
  production: false,
});

@Service()
export class APNSService {
  public async sendNotification(
    body: NotificationBody,
    deviceTokens: string | string[],
    config?: APNSConfig
  ): Promise<void> {
    // return new Promise((resolve, reject) => {
    logger.info('Begin sending notification to APNS', { body, deviceTokens, inputConfig: config });
    const compiledConfig: APNSConfig = {
      ...defaultConfig,
      ...config,
    };
    const tokenPayload: JwtPayload = {
      iss: Config.APPLE_TEAM_ID,
      iat: Date.now(),
    };
    const tokenHeaders: JwtHeader = {
      alg: 'ES256',
      kid: Config.PUSH_KEY_ID,
    };
    logger.debug('Token components', { tokenPayload, tokenHeaders, tokenKey: Config.PUSH_KEY });
    const token = sign(tokenPayload, Config.PUSH_KEY, {
      header: tokenHeaders,
    });

    const notification = new Notification();
    notification.rawPayload = body;
    notification.topic = Config.IOS_APP_ID;
    notification.expiry = compiledConfig.expiration ?? 0;
    notification.priority = compiledConfig.priority ?? 10;
    notification.pushType = compiledConfig.pushType ?? 'alert';

    let res = await apnProvider.send(notification, deviceTokens);
    logger.debug('response from APNS', { res });
  }
}

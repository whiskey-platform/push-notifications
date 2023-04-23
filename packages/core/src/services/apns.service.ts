import { connect } from 'http2';
import { Config } from 'sst/node/config';
import { Service } from 'typedi';
import { logger } from '../utils';
import { APNSConfig, NotificationBody } from '@push-notifications/defs';
import { error } from 'console';
import { sign } from 'jsonwebtoken';

const defaultConfig: APNSConfig = {
  pushType: 'alert',
  expiration: 0,
  priority: 10,
};

@Service()
export class APNSService {
  public async sendNotification(body: NotificationBody, deviceToken: string, config?: APNSConfig) {
    logger.info('Begin sending notification to APNS', { body, deviceToken, inputConfig: config });
    const compiledConfig: APNSConfig = {
      ...defaultConfig,
      ...config,
    };
    const token = sign(
      {
        iss: Config.APPLE_TEAM_ID,
        iat: Date.now(),
      },
      Config.PUSH_KEY,
      {
        header: {
          alg: 'ES256',
          kid: Config.PUSH_KEY_ID,
        },
      }
    );
    const client = connect(Config.APNS_BASE_URL);
    logger.debug(`Connected to ${Config.APNS_BASE_URL}`);
    client.on('error', err => logger.error('Error connecting to APNS', { error: err }));
    const headers: Record<string, any> = {
      ':method': 'POST',
      'apns-topic': Config.IOS_APP_ID,
      ':scheme': 'https',
      ':path': `/3/device/${deviceToken}`,
      authorization: `bearer ${token}`,
      'apns-push-type': compiledConfig.pushType,
      'apns-expiration': compiledConfig.expiration,
      'apns-priority': compiledConfig.priority,
    };
    if (compiledConfig.collapseId) {
      headers['apns-collapse-id'] = compiledConfig.collapseId;
    }
    logger.debug('Sending headers to APNS', { headers });
    const request = client.request(headers);

    request.on('response', (headers, flags) => {
      logger.debug('Received response from APNS', { headers, flags });
    });

    request.setEncoding('utf8');
    let data = '';
    request.on('data', chunk => {
      data += chunk;
    });
    request.write(JSON.stringify(body));
  }
}

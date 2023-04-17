import { connect } from 'http2';
import { Config } from 'sst/node/config';
import { Service } from 'typedi';
import { logger } from '../utils';
import { error } from 'console';
import { sign } from 'jsonwebtoken';

export interface APNSConfig {
  pushType:
    | 'alert'
    | 'background'
    | 'location'
    | 'voip'
    | 'complication'
    | 'fileprovider'
    | 'mdm'
    | 'liveactivity';
  notificationId?: string;
  expiration: number;
  priority: 10 | 5 | 1;
  collapseId?: string;
}
const defaultConfig: APNSConfig = {
  pushType: 'alert',
  expiration: 0,
  priority: 10,
};

@Service()
export class APNSService {
  public async sendNotification(
    body: any,
    deviceToken: string,
    config?: APNSConfig
  ) {
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
    client.on('error', (err) =>
      logger.error('Error connecting to APNS', error)
    );
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

    const request = client.request(headers);

    request.on('response', (headers, flags) => {
      for (const name in headers) {
        console.log(`${name}: ${headers[name]}`);
      }
    });

    request.setEncoding('utf8');
    let data = '';
    request.on('data', (chunk) => {
      data += chunk;
    });
    request.write(JSON.stringify(body));
  }
}

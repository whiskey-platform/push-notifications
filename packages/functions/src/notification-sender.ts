import 'reflect-metadata';
import { SNSHandler } from 'aws-lambda';
import { db } from '@push-notifications/core/db';
import Container from 'typedi';
import { APNSService } from '@push-notifications/core/services/apns.service';
import { PostNotificationsRequestBody } from '@push-notifications/defs';
import { logger } from '@push-notifications/core/utils';

const apns = Container.get(APNSService);

export const handler: SNSHandler = async event => {
  for (const record of event.Records) {
    const input: PostNotificationsRequestBody = JSON.parse(record.Sns.Message);
    logger.info('New SNS message', { input });
    let deviceTokensSelect = db.selectFrom('device_tokens').select('device_token');
    if (input.userId) deviceTokensSelect = deviceTokensSelect.where('user_id', '=', input.userId);
    const deviceTokens = await deviceTokensSelect.execute();
    logger.debug('Retrieved device tokens', { tokens: deviceTokens.map(v => v.device_token) });
    await apns.sendNotification(
      input.body,
      deviceTokens.map(v => v.device_token),
      input.config
    );
  }
};

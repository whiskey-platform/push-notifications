import 'reflect-metadata';
import { SNSHandler } from 'aws-lambda';
import { SendNotificationSNSMessage } from '@push-notifications/core/model';
import { db } from '@push-notifications/core/db';
import Container from 'typedi';
import { APNSService } from '@push-notifications/core/services/apns.service';

const apns = Container.get(APNSService);

export const handler: SNSHandler = async (event) => {
  for (const record of event.Records) {
    const input: SendNotificationSNSMessage = JSON.parse(record.Sns.Message);
    let deviceTokensSelect = db
      .selectFrom('device_tokens')
      .select('device_token');
    if (input.userId)
      deviceTokensSelect = deviceTokensSelect.where(
        'user_id',
        '=',
        input.userId
      );
    const deviceTokens = await deviceTokensSelect.execute();

    for (const token of deviceTokens) {
      await apns.sendNotification(input.body, token.device_token, input.config);
    }
  }
};

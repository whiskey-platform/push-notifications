import 'reflect-metadata';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import { APIGatewayJSONBodyEventHandler, json } from 'src/utils/lambda-utils';
import requestMonitoring from 'src/middleware/request-monitoring';
import { validateAuth } from 'src/middleware/validate-auth';
import { logger } from '@push-notifications/core/utils';
import { db } from '@push-notifications/core/db';
import { validateBody } from 'src/middleware/validate-body';
import {
  PostDeviceTokensRequestBody,
  PostDeviceTokensRequestBodyDecoder,
} from '@push-notifications/defs';

const addDeviceToken: APIGatewayJSONBodyEventHandler<PostDeviceTokensRequestBody> = async event => {
  logger.info('Begin Add Device Token request');
  const tokens = await db
    .selectFrom('device_tokens')
    .select(['device_token'])
    .where('user_id', '=', parseInt(event.headers['x-user-id']!))
    .execute();
  if (!tokens.map(v => v.device_token).includes(event.body.token)) {
    // no duplicates
    const count = tokens.length;
    logger.info(`User ${event.headers['x-user-id']} has ${count} device tokens`);
    try {
      logger.info('Saving device token', {
        userId: event.headers['x-user-id'],
        deviceToken: event.body.token,
      });
      await db
        .insertInto('device_tokens')
        .values({
          user_id: parseInt(event.headers['x-user-id']!),
          index: count,
          device_token: event.body.token,
        })
        .execute();
      logger.info('Successfully saved device token to database');
      return json({ success: true });
    } catch (error) {
      logger.error('Error seving device token to DB', error);
      return json({ success: false });
    }
  }
  return json({ success: true });
};

export const handler = middy(addDeviceToken)
  .use(requestMonitoring())
  .use(jsonBodyParser())
  .use(validateAuth())
  .use(validateBody(PostDeviceTokensRequestBodyDecoder));

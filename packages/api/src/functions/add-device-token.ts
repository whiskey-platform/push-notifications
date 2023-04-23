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
  const count = (
    await db
      .selectFrom('device_tokens')
      .select('index')
      .where('user_id', '=', parseInt(event.headers['x-user-id']!))
      .execute()
  ).length;
  try {
    await db
      .insertInto('device_tokens')
      .values({
        user_id: parseInt(event.headers['x-user-id']!),
        index: count,
        device_token: event.body.token,
      })
      .execute();
    return json({ success: true });
  } catch (error) {
    logger.error('Error seving device token to DB', error);
    return json({ success: false });
  }
};

export const handler = middy(addDeviceToken)
  .use(requestMonitoring())
  .use(jsonBodyParser())
  .use(validateAuth())
  .use(validateBody(PostDeviceTokensRequestBodyDecoder));

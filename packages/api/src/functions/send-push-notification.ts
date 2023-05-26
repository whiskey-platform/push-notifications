import 'reflect-metadata';
import { SNSService, wrapped } from '@push-notifications/core';
import Container from 'typedi';
import { APIGatewayJSONBodyEventHandler, json } from '../utils/lambda-utils';
import { Topic } from 'sst/node/topic';
import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import {
  PostNotificationsRequestBody,
  PostNotificationsRequestBodyDecoder,
} from '@push-notifications/defs';
import { validateBody } from '../middleware/validate-body';
import responseMonitoring from '../middleware/response-monitoring';

const sns = Container.get(SNSService);

const sendPushNotification: APIGatewayJSONBodyEventHandler<
  PostNotificationsRequestBody
> = async event => {
  await sns.publishEvent(event.body, Topic.NotificationsTopic.topicArn);
  return json({
    success: true,
    message: 'Notification successfully sent to Topic for processing',
  });
};

export const handler = wrapped(sendPushNotification)
  .use(responseMonitoring())
  .use(jsonBodyParser())
  .use(validateBody(PostNotificationsRequestBodyDecoder));

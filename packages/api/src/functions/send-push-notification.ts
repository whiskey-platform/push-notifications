import 'reflect-metadata';
import { SNSService } from '@push-notifications/core/services';
import Container from 'typedi';
import { APIGatewayJSONBodyEventHandler, json } from 'src/utils/lambda-utils';
import { Topic } from 'sst/node/topic';
import middy from '@middy/core';
import requestMonitoring from 'src/middleware/request-monitoring';
import jsonBodyParser from '@middy/http-json-body-parser';
import {
  PostNotificationsRequestBody,
  PostNotificationsRequestBodyDecoder,
} from '@push-notifications/defs';
import { validateBody } from 'src/middleware/validate-body';

const sns = Container.get(SNSService);

const sendPushNotification: APIGatewayJSONBodyEventHandler<PostNotificationsRequestBody> = async event => {
  await sns.publishEvent(event.body, Topic.NotificationsTopic.topicArn);
  return json({
    success: true,
    message: 'Notification successfully sent to Topic for processing',
  });
};

export const handler = middy(sendPushNotification)
  .use(requestMonitoring())
  .use(jsonBodyParser())
  .use(validateBody(PostNotificationsRequestBodyDecoder));

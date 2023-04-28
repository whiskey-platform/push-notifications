import 'reflect-metadata';
import { DynamoDBService } from '@push-notifications/core/services';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import Container from 'typedi';
import { Table } from 'sst/node/table';
import middy from '@middy/core';
import requestMonitoring from 'src/middleware/request-monitoring';
import { validateAuth } from 'src/middleware/validate-auth';

const dynamodb = Container.get(DynamoDBService);

const getNotifications: APIGatewayProxyHandlerV2 = async event => {
  let channels: string[] | undefined;
  let operator: ('IN' | 'NOT IN') | undefined;

  if (event.queryStringParameters?.channels) {
    channels = event.queryStringParameters.channels.split(',');
    operator = 'IN';
  } else if (event.queryStringParameters?.excludeChannels) {
    channels = event.queryStringParameters.excludeChannels.split(',');
    operator = 'NOT IN';
  }

  if (channels) {
    const notifications = await dynamodb.getWhereArrayCondition(
      'channel',
      channels!,
      operator!,
      Table.NotificationsTable.tableName
    );
    return {
      statusCode: 200,
      body: JSON.stringify(notifications),
    };
  } else {
    const notifications = await dynamodb.getAllItems(Table.NotificationsTable.tableName);
    return {
      statusCode: 200,
      body: JSON.stringify(notifications),
    };
  }
};

export const handler = middy(getNotifications).use(requestMonitoring()).use(validateAuth());

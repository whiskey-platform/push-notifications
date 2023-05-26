import { MessageAttributeValue, PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Service } from 'typedi';
import { logger } from '../utils';
import { tracer } from '../utils/tracer';

const snsClient = new SNSClient({ region: process.env.AWS_REGION });
tracer.captureAWSv3Client(snsClient);

@Service()
export class SNSService {
  public async publishEvent(
    event: any,
    topicArn: string,
    attributes?: Record<string, MessageAttributeValue>
  ): Promise<void> {
    logger.info(`Publishing event to SNS`, { event, topicArn });
    const snsReq = new PublishCommand({
      Message: JSON.stringify(event),
      TopicArn: topicArn,
      MessageAttributes: attributes,
    });
    await snsClient.send(snsReq);
    logger.info(`Successfully published event to SNS`);
  }
}

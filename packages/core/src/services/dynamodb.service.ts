import { Service } from 'typedi';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ExecuteStatementCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { tracer } from '../utils/tracer';

@Service()
export class DynamoDBService {
  private docClient: DynamoDBDocumentClient;
  constructor() {
    const dynamo = new DynamoDBClient({ region: process.env.AWS_REGION });
    tracer.captureAWSv3Client(dynamo);
    this.docClient = DynamoDBDocumentClient.from(dynamo);
  }
  public async saveItem(Item: any, TableName: string) {
    const saveRequest = new PutCommand({
      Item,
      TableName,
    });
    await this.docClient.send(saveRequest);
  }
  public async getWhereArrayCondition(
    key: string,
    values: string[],
    operator: 'IN' | 'NOT IN',
    tableName: string
  ) {
    const arrayString = `[${values[0]}${
      values.slice(1).length !== 0
        ? values.slice(1).reduce((string, current) => string + ', ' + current, '')
        : ''
    }]`;
    const Statement = `SELECT * from ${tableName} WHERE ${key} ${operator} ${arrayString}`;
    const executeRequest = new ExecuteStatementCommand({
      Statement,
    });
    const response = await this.docClient.send(executeRequest);
    return response.Items ?? [];
  }
  public async getAllItems(TableName: string) {
    const Statement = `SELECT * from ${TableName}`;
    const executeRequest = new ExecuteStatementCommand({
      Statement,
    });
    const response = await this.docClient.send(executeRequest);
    return response.Items ?? [];
  }
}

import { StackContext, Table } from 'sst/constructs';

export const TableStack = ({ stack }: StackContext) => {
  const table = new Table(stack, 'NotificationsTable', {
    fields: {
      channel: 'string',
      timestamp: 'number',
    },
    primaryIndex: {
      partitionKey: 'channel',
      sortKey: 'timestamp',
    },
  });

  return table;
};

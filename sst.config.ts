import { SSTConfig } from 'sst';
import { Api } from './stacks/Api';
import { Secrets } from './stacks/Secrets';
import { TopicStack } from './stacks/Topic';
import { TableStack } from './stacks/Table';

export default {
  config(_input) {
    return {
      name: 'push-notifications',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(Secrets).stack(TableStack).stack(TopicStack).stack(Api);
  },
} satisfies SSTConfig;

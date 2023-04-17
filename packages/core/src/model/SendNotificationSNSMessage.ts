import { APNSConfig } from '../services/apns.service';

export interface SendNotificationSNSMessage {
  body: {
    aps: {
      alert?: {
        title: string;
        subtitle: string;
        body: string;
        'launch-image'?: string;
      };
      badge?: number;
      sound?: 'default';
      'thread-id'?: string;
      category?: string;
      'content-available'?: 1;
      'mutable-content'?: 1;
      'target-content-id'?: string;
      'interruption-level'?:
        | 'passive'
        | 'active'
        | 'time-sensitive'
        | 'critical';
      'relevance-score'?: number;
      'filter-criteria'?: string;
      // Live Activities
      'stale-date'?: number;
      'content-state'?: Record<string, any>;
      timestamp?: number;
      events?: string;
    };
  };
  config: APNSConfig;
  userId?: number;
}

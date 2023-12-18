export interface NotificationValue {
  scrap_id: string;
  collection_id: string;
  collection_title: string;
  message: string;
  url: string;
  created_at: string;
  avatar: string;
}

export interface NotificationSubscriptionData {
  new?: {
    data?: NotificationValue;
    created_at?: string;
    avatar?: string;
    notification_type?: number;
  };
}

// notification content is an array of objects
export interface NotificationContent {
  notificationContent?: Array<NotificationValue>;
  newNotificationsContent: Array<NotificationValue>;
  type?: 'list' | 'popup';
  loading?: boolean;
}
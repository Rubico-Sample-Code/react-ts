import React from 'react';

interface NotificationCountProps {
  newNotificationsCount: number;
}
const NotificationCount = (props: NotificationCountProps) => {
  const { newNotificationsCount } = props;

  if (newNotificationsCount > 0) {
    return <span className={"notification-list__count"} />;
  }

  return null;
}

export default NotificationCount;
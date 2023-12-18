import React from 'react';
import NotificationItem from './NotificationItem';
import { NotificationContent } from '../NotificationListTypes';
import NotificationCount from './NotificationCount';
import { Link } from 'react-router-dom';
import EmptyPageMessage from '../../Global/EmptyPageMessage';

const NotificationItems = (props: NotificationContent) => {
  const { newNotificationsContent, notificationContent, type, loading } = props;
  const newNotificationsCount = newNotificationsContent.length;

  return (
    <>
      <h3 className="notification-list__heading">Notifications</h3>

      {((
        (!notificationContent || notificationContent?.length === 0) &&
        newNotificationsCount === 0
      ) && !loading) && (
        <EmptyPageMessage header={{}}>
          <div>There are no new notifications!</div>
        </EmptyPageMessage>
      )}

      <div className="notification-items">
        {newNotificationsCount !== 0 && (
          <>
            {type !== 'popup' && (
              <h4 className="notification-items__heading">New</h4>
            )}
            <div>
              {newNotificationsContent.map((notification, index) => (
                <NotificationItem key={`noti-${index}`} {...notification} />
              ))}
            </div>
          </>
        )}

        {newNotificationsCount !== 0 && type !== 'popup' && (
          <h4 className="notification-items__heading">Older</h4>
        )}
        <div>
          {notificationContent?.map((notification, index) => (
            <NotificationItem key={`noti-${index}`} {...notification} />
          ))}
        </div>

        {type === 'popup' && (
          <Link to="/notifications" className="notification-items__view-all">
            View older notifications
          </Link>
        )}
      </div>
    </>
  );
};

export default NotificationItems;

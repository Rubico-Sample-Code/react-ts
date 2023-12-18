import React, { useState } from 'react';
import NotificationCount from './NotificationCount';
import { NotificationValue } from '../NotificationListTypes';
import NotificationItems from './NotificationItems';
import useWindowOnClick from "../../../helpers/customHooks/useWindowOnclick";

interface NotificationPopupProps {
  newNotificationsContent: NotificationValue[];
  notificationContent: NotificationValue[];
  clearNewNotifications: () => void;
  markAsRead: () => void;
}

const NotificationPopup = (props: NotificationPopupProps) => {
  const { newNotificationsContent, clearNewNotifications, markAsRead } = props;
  const [showNotificationList, setShowNotificationList] = useState<boolean>(
    false
  );

  useWindowOnClick({
    cb: (el) => {
      const closestElement = el.closest('.notification-popup');
      if (!closestElement) {
        setShowNotificationList(false);
        clearNewNotifications();
      }

      // mark notifications as read, only when the user opens popup
      markAsRead();
    },
    removeListener: !showNotificationList,
  });

  function toggleNotificationList() {
    const newPopupState = !showNotificationList;
    if (!newPopupState) {
      clearNewNotifications();
    }
    setShowNotificationList(newPopupState);
  }

  function notificationIcon() {
    return (
      <svg
        viewBox="0 0 24 28"
        xmlns="http://www.w3.org/2000/svg"
        className="notification-popup__icon"
      >
        <path d="M12 0C10.3431 0 9 1.2536 9 2.8V3.27798C5.50443 4.43112 3.00001 7.54259 3.00001 11.2L3.00001 13.3L3.00001 16.2395L0.573805 19.3531C-0.0898731 20.2048 -0.185362 21.3321 0.326667 22.2706C0.838698 23.2091 1.87164 23.8 3.00001 23.8H7.5C7.5 26.1196 9.51472 28 12 28C14.4853 28 16.5 26.1196 16.5 23.8H21C22.1284 23.8 23.1613 23.2091 23.6733 22.2706C24.1854 21.3321 24.0899 20.2048 23.4262 19.3531L21 16.2395L21 13.3V11.2C21 7.54259 18.4956 4.43112 15 3.27798V2.8C15 1.2536 13.6569 0 12 0ZM13.5018 21H13.5H10.5L6.7095 21H3.00001L5.18183 18.2L5.42622 17.8864C5.79913 17.4078 6.00001 16.8312 6.00001 16.2395V13.3V11.2C6.00001 8.10721 8.68629 5.6 12 5.6C15.3137 5.6 18 8.1072 18 11.2L18 13.3V16.2395C18 16.8312 18.2009 17.4078 18.5738 17.8864L18.8182 18.2L21 21H17.2905H13.5018ZM12 25.2C11.1716 25.2 10.5 24.5732 10.5 23.8H13.5C13.5 24.5732 12.8284 25.2 12 25.2Z"/>
      </svg>
    )
  }

  return (
    <div
      className="notification-popup"
      role="button"
      onClick={() => toggleNotificationList()}
    >

      {notificationIcon()}

      <div className="notification-popup__count">
        <NotificationCount
          newNotificationsCount={newNotificationsContent.length}
        />
      </div>

      {showNotificationList && (
        <div className={`notification-popup__list ${newNotificationsContent.length > 0 ? "with-notifications" : ""}`}>
          <NotificationItems
            newNotificationsContent={newNotificationsContent}
            type="popup"
          />
        </div>
      )}
    </div>
  );
};

export default NotificationPopup;

import React from "react";
import { Link } from "react-router-dom";
import { NotificationValue } from "../NotificationListTypes";
import { notificationDateFormat } from "../NotificationListHelpers";

const NotificationItem = (props: NotificationValue) => {
  const { avatar, message, url, created_at } = props;

  /**
   * Take in a string and remove the {} from the string
   * wrap it into a span and add a class to it
   * @param text
   * @returns react element
   */
  function formatNotificationText(text: string) {
    const regex = /{([^}]+)}/g;
    const matches = text?.match(regex);

    if (matches) {
      matches.forEach((match) => {
        const matchText = match.replace('{', '').replace('}', '');
        text = text.replace(
          match,
          `<span class="notification-item__highlight">${matchText}</span>`
        );
      });
    }

    return <p dangerouslySetInnerHTML={{ __html: text }} />;
  }

  return (
    <Link to={url} className="notification-item">
      <div className="notification-item__avatar">
        <img
          className="avatar__user-avatar scrap-card__user-avatar"
          src={avatar ? avatar : '/dashboard/img/default-avatar.jpg'}
          alt=""
        />
      </div>

      <div className="notification-item__message">
        {formatNotificationText(message)}
      </div>

      <div className="notification-item__date">{created_at ? notificationDateFormat(created_at) : ''}</div>
    </Link>
  );
}

export default NotificationItem;
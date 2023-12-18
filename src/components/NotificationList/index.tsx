import React, { useEffect, useState } from 'react';
import './NotificationListStyles.css';
import NotificationItems from './Components/NotificationItems';
import { createClient } from '@supabase/supabase-js';

import * as config from '../../settings.json';
import {
  NotificationSubscriptionData,
  NotificationValue,
} from './NotificationListTypes';
import { useSelector } from 'react-redux';
import { userTypes } from '../../types/user';
import { ReduxStateType } from '../../redux/store';
import NotificationPopup from './Components/NotificationPopup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const faSpinnerIcon = faSpinner as IconProp;

/**
 * Same component will be used in notification list and popup
 * @param view - view type of the component
 * @returns NotificationList component or NotificationPopup component
 */
interface NotificationListProps {
  // if no value default is list
  view?: 'list' | 'popup';
  firstLoad?: number;

}

const NotificationList = (props: NotificationListProps) => {
  const { view, firstLoad } = props;
  const [dataFinished, setDataFinished] = useState<boolean>(false);
  const [loadCount, setLoadCount] = useState<number>(firstLoad || 20);
  const [newNotificationsContent, setNewNotificationsContent] = useState<
    NotificationValue[]
  >([]);
  const [notificationContent, setNotificationContent] = useState<
    NotificationValue[]
  >([]);
  const [ loading, setLoading ] = useState<boolean>(false);

  const user: userTypes = useSelector((state: ReduxStateType) => state.user);
  const supabase = createClient(
    config.supabaseApiUrl,
    config.supabaseAnonKey
  );

  /**
   * get the latest notification's created_at data from newNotificationsContent
   * and save it in local storage
   */
  function markAsRead() {
    const latestNotification = newNotificationsContent[0];
    if (latestNotification) {
      localStorage.setItem(
        'last_notification',
        latestNotification.created_at
      );
    }
  }

  function loadData(rangeStart: number, rangeEnd: number) {
    setLoading(true);

    supabase
      .from(config.supabaseDatabase)
      .select('data, created_at, notification_type')
      .eq('user_id', user.user_id)
      .range(rangeStart, rangeEnd)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if(error) console.log('error', error);
        if( data.length === 0) setDataFinished(true);

        const notificationValues = [];
        data.forEach((notification) => {
          let notificationValue = null;
          try {
            notificationValue = JSON.parse(notification.data);

            if(notification.notification_type === 1 ) {
              notificationValue.url = '/contacts?invite'
            }
          }
          catch (e) {
            console.error('error in parsing notification data', e);
            notificationValue = null;
          }

          if(notificationValue) {
            notificationValues.push({ ...notificationValue, created_at: notification.created_at });
          }
        });

        let lastNotificationTime: Date | number | string;

        try {
          lastNotificationTime = localStorage.getItem('last_notification');
          if(!lastNotificationTime) throw new Error('no last notification');
        } catch (_e) {
          lastNotificationTime = new Date();
          lastNotificationTime = lastNotificationTime.setHours(0, 0, 0, 0);
          lastNotificationTime = new Date(lastNotificationTime).toISOString();
        }

        const newNotifications = notificationValues.filter((notification) => {
          return notification.created_at > lastNotificationTime;
        });
        const oldNotifications = notificationValues.filter((notification) => {
          return notification.created_at <= lastNotificationTime;
        });

        setNotificationContent(current => {
          return [...current, ...oldNotifications];
        })
        setNewNotificationsContent(current => {
          return [...current, ...newNotifications];
        });

        setLoading(false);
      });
  }

  useEffect(() => {
    let subscription = null;
    if (user.user_id) {
      subscription = supabase
        .channel('any')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: config.supabaseDatabase,
            filter: `user_id=eq.${user.user_id}`,
          },
          (payload: NotificationSubscriptionData) => {
            const notificationData = payload.new;
            const notificationValues = {
              ...notificationData.data,
              created_at: notificationData.created_at,
            };

            if(notificationData.notification_type === 1 ) {
              notificationValues['url'] = '/contacts?invite'
            }

            setNewNotificationsContent((prevData: NotificationValue[]) => [
              notificationValues,
              ...prevData,
            ]);
          }
        )
        .subscribe();

      loadData(0, loadCount);
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [user.user_id]);

  /**
   * When the popup closes
   * clear all the new notifications
   * move them to old notifications
   */
  function clearNewNotifications() {
    setNewNotificationsContent((prevData: NotificationValue[]) => {
      setNotificationContent((prevNotificationData: NotificationValue[]) => {
        return [...prevData, ...prevNotificationData];
      });

      return [];
    });
  }

  function loadMoreNotifications() {
    const newLoadCount = loadCount + 20;
    loadData(loadCount, newLoadCount);
    setLoadCount(newLoadCount);
  }

  if (view === 'popup') {
    return (
      <NotificationPopup
        newNotificationsContent={newNotificationsContent}
        notificationContent={notificationContent}
        clearNewNotifications={clearNewNotifications}
        markAsRead={markAsRead}
      />
    );
  }

  return (
    <div className="notification-list__wrapper">
      <div className="notification-list__content">
        <NotificationItems
          notificationContent={notificationContent}
          newNotificationsContent={newNotificationsContent}
          type={view}
          loading={loading}
        />

        {
          !dataFinished && (
            <div className="notification-items__view-all-wrapper">
              <a
                href="#"
                className="notification-items__view-all"
                onClick={loadMoreNotifications}
              >
                {' '}Load more
                {
                  loading && (
                    <>
                      {'  '}
                      <FontAwesomeIcon icon={ faSpinnerIcon } spin size="lg" />
                    </>
                  )
                }
              </a>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default NotificationList;

import {
  useState,
  useEffect
} from "react";

function Notifications() {

  const role =
    localStorage.getItem("role");

  const userEmail =
    localStorage.getItem("userEmail");

  /* =========================
     NOTIFICATION STATE
  ========================= */

  const [notifications, setNotifications] =
    useState(() => {

      const savedNotifications =

        localStorage.getItem(
          "notifications"
        );

      return savedNotifications
        ? JSON.parse(savedNotifications)
        : [];

    });

  /* =========================
     SAVE LOCAL STORAGE
  ========================= */

  useEffect(() => {

    localStorage.setItem(

      "notifications",

      JSON.stringify(
        notifications
      )

    );

  }, [notifications]);

  /* =========================
     DELETE NOTIFICATION
  ========================= */

  const deleteNotification = (
    id
  ) => {

    const updatedNotifications =

      notifications.filter(
        (item) =>
          item.id !== id
      );

    setNotifications(
      updatedNotifications
    );

  };

  /* =========================
     MARK AS READ
  ========================= */

  const markAsRead = (id) => {

    const updatedNotifications =

      notifications.map(
        (item) => {

          if(item.id === id){

            return {

              ...item,

              read: true
            };
          }

          return item;

        }
      );

    setNotifications(
      updatedNotifications
    );

  };

  /* =========================
     CLEAR ALL
  ========================= */

  const clearAllNotifications = () => {

    const confirmDelete =
      window.confirm(
        "Clear All Notifications?"
      );

    if(!confirmDelete){

      return;
    }

    setNotifications([]);

  };

  /* =========================
     FILTER ROLE BASED
  ========================= */

  const filteredNotifications =

    notifications.filter(
      (item) => {

        /* Admin */

        if(role === "admin"){

          return (
            item.to === "admin"
            ||
            item.to === userEmail
          );
        }

        /* Manager */

        if(role === "manager"){

          return (
            item.to === "manager"
            ||
            item.to === userEmail
          );
        }

        /* Employee */

        return (
          item.to === userEmail
        );

      }
    )

    .reverse();

  /* =========================
     UNREAD COUNT
  ========================= */

  const unreadCount =

    filteredNotifications.filter(
      (item) =>
        item.read === false
    ).length;

  return (

    <div className="notifications-container">

      {/* Header */}

      <div className="notification-header">

        <h1>
          Notifications
        </h1>

        <div className="notification-top">

          <span className="notification-count">

            Unread:
            {" "}
            {unreadCount}

          </span>

          <button
            className="clear-btn"
            onClick={
              clearAllNotifications
            }
          >

            Clear All

          </button>

        </div>

      </div>

      {/* Notification List */}

      <div className="notification-list">

        {
          filteredNotifications.length === 0

          ?

          <p>
            No Notifications Found
          </p>

          :

          filteredNotifications.map(
            (item) => (

            <div
              key={item.id}
              className={

                item.read

                ?

                "notification-card read-notification"

                :

                "notification-card unread-notification"
              }
            >

              <h3>
                {item.title}
              </h3>

              <p>
                {item.message}
              </p>

              <small>
                {item.time}
              </small>

              <div className="notification-actions">

                {
                  !item.read

                  &&

                  <button
                    className="completed-btn"
                    onClick={() =>
                      markAsRead(
                        item.id
                      )
                    }
                  >

                    Mark As Read

                  </button>
                }

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteNotification(
                      item.id
                    )
                  }
                >

                  Delete

                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Notifications;
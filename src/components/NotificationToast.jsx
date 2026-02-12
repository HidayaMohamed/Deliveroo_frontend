import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../features/auth/useAuth";

const NotificationToast = () => {
  const { user, loading } = useAuth();
  const [lastNotificationId, setLastNotificationId] = useState(0);

  const fetchNotifications = async () => {
    if (!user || loading) return;

    try {
      const response = await api.get("/notifications", {
        params: {
          limit: 10,
          unread_only: true,
        },
      });

      const { notifications } = response.data;

      if (notifications && notifications.length > 0) {
        // Show toast for each new notification
        notifications.forEach((notification) => {
          if (notification.id > lastNotificationId) {
            // Determine toast type based on notification type
            let toastType = "default";
            if (notification.type === "STATUS_UPDATE") {
              toastType = "info";
            } else if (notification.type === "COURIER_ASSIGNED") {
              toastType = "success";
            } else if (notification.type === "DELIVERY_COMPLETE") {
              toastType = "success";
            }

            // Show the toast
            toast(notification.message, {
              icon:
                toastType === "info"
                  ? "ℹ️"
                  : toastType === "success"
                    ? "✅"
                    : "🔔",
              duration: 5000,
              style: {
                background:
                  toastType === "info"
                    ? "#e0f2fe"
                    : toastType === "success"
                      ? "#dcfce7"
                      : "#f3f4f6",
                color:
                  toastType === "info"
                    ? "#0369a1"
                    : toastType === "success"
                      ? "#166534"
                      : "#1f2937",
              },
            });

            // Update last notification ID
            setLastNotificationId(notification.id);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      // Initial fetch
      fetchNotifications();

      // Poll every 15 seconds
      const interval = setInterval(fetchNotifications, 15000);

      return () => clearInterval(interval);
    }
  }, [user, loading]);

  // If user is not logged in, don't show notifications
  if (!user || loading) {
    return null;
  }

  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: "",
        duration: 5000,
        style: {
          background: "#fff",
          color: "#363636",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          padding: "16px",
          borderRadius: "8px",
        },
        success: {
          duration: 5000,
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
};

export default NotificationToast;

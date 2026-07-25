import { useState, useEffect } from "react";

export function useNotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load unread count from localStorage or API
    const savedCount = localStorage.getItem("unreadNotifications");
    if (savedCount) {
      setUnreadCount(parseInt(savedCount, 10));
    }
    // In future: fetch from API
  }, []);

  return unreadCount;
}

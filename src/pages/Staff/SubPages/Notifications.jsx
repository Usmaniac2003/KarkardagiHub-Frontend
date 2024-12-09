import React, { useEffect } from "react"
import { useNotificationContext } from "../../../context/notificationContext"

const Notifications = () => {
  const { notifications, loading, error, fetchNotifications } = useNotificationContext()

  useEffect(() => {
    fetchNotifications()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  if (error) {
    return <div className="text-red-600 text-center">Error: {error}</div>
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>
        <div className="space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="bg-blue-50 p-4 rounded-md"
              >
                <h3 className="font-semibold text-lg">{notification.title}</h3>
                <p className="text-gray-600">{notification.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
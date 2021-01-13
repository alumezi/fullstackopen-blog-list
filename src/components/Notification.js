import React from 'react'
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(state => state.notification);
  if (!notification.message) {
    return null
  }

  const style = {
    color: notification.notificationType === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  return <div className="notification-message" style={style}>{notification.message}</div>
}

export default Notification

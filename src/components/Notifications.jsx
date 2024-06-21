import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const NotificationContainer = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  width: 300px;
`;

const NotificationItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NotificationTitle = styled.h3`
  margin: 0;
  margin-bottom: 5px;
  color: #333;
`;

const NotificationText = styled.p`
  margin: 0;
  color: #777;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Alerta', message: 'Ainda sem notificações' },
  ]);

  const handleClose = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <>
    <NavBar/>
      <NotificationContainer>
      {notifications.map(notification => (
        <NotificationItem key={notification.id}>
          <NotificationTitle>{notification.title}</NotificationTitle>
          <NotificationText>{notification.message}</NotificationText>
          <CloseButton onClick={() => handleClose(notification.id)}>X</CloseButton>
        </NotificationItem>
      ))}
    </NotificationContainer>
    </>
  
  );
};

export default Notifications;

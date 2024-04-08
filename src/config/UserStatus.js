import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { auth } from '../config/firebaseConfig'; 
import { useAuthState } from 'react-firebase-hooks/auth';

const StatusIndicator = styled.div`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
 
`;

const Container= styled.div`
  padding-left: 3rem;
  padding-top: 1rem;
`;

const OnlineStatus = styled.span`
  color: green;
 
`;

const OfflineStatus = styled.span`
  color: red;
 
`;

const UserStatus = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setIsOnline(true); 
    } else {
      setIsOnline(false); 
    }
  }, [user]);

  return (
    <Container>
      <StatusIndicator style={{ backgroundColor: isOnline ? 'green' : 'red' }} />
      {isOnline ? <OnlineStatus>Online</OnlineStatus> : <OfflineStatus>Offline</OfflineStatus>}
    </Container>
  );
};

export default UserStatus;

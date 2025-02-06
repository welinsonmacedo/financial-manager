import React from 'react';
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c0392b;
  }
`;

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('Logout successful!');
      navigate('/'); 
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </div>
  );
};

export default Logout;

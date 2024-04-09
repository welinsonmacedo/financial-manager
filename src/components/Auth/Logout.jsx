import React from 'react';
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from 'react-router-dom';

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
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

import React from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebaseConfig';
import NavBar from './NavBar';

const ProfileContainer = styled.div`
  max-width: 400px;
  padding-top: 200px;
  margin: 0 auto;

  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfileTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const ProfileItem = styled.div`
  margin-bottom: 15px;
`;

const ProfileLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const ProfileInfo = styled.span`
  color: #777;
`;

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

const Profile = () => {
    const [user] = useAuthState(auth);

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <>
            <NavBar />
            <ProfileContainer>
                <ProfileTitle>Perfil do Usuário</ProfileTitle>
                <ProfileItem>
                    <ProfileLabel>Nome:</ProfileLabel> <ProfileInfo>{user.displayName}</ProfileInfo>
                </ProfileItem>
                <ProfileItem>
                    <ProfileLabel>Email:</ProfileLabel> <ProfileInfo>{user.email}</ProfileInfo>
                </ProfileItem>
                <ProfileItem>
                    <ProfileLabel>Plano Atual:</ProfileLabel> Free<ProfileInfo></ProfileInfo>
                </ProfileItem>
                <ProfileItem>
                    <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </ProfileItem>
            </ProfileContainer>
        </>

    );
};

export default Profile;

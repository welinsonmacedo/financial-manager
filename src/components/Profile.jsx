import React from 'react';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebaseConfig';
import NavBar from './NavBar';
import Logout from './Auth/Logout'
import { NavLink } from 'react-router-dom';
import { Pencil } from "lucide-react";
import UserDetailsView from './User/UserDetailsView';

const Container = styled.div`
padding-top:4rem;
  width: 100%;
  min-height: 80vh;
display: flex;
justify-content: center;
align-items: center;
`;
const ProfileContainer = styled.div`
 max-width: 400px;
 padding: 1rem 3rem;
 margin-top: 5rem;
background-color: aliceblue;
`;



const ProfileTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const ProfileItem = styled.div`
  margin: 15px;
`;

const ProfileLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const ProfileInfo = styled.span`
  color: #777;
`;

const Link = styled(NavLink)`
  margin: 15px 0;
  padding: 3rem 0;
`

const Profile = () => {
    const [user] = useAuthState(auth);

   
    return (
        <>
            <NavBar />
            <Container>
            <ProfileContainer>
                <ProfileTitle>Perfil do Usuário</ProfileTitle>
            
                <Link to="/userdetails"><Pencil size={20} /> Editar</Link>
                <UserDetailsView/>
                <ProfileItem>
                    <ProfileLabel>Plano Atual:</ProfileLabel> Free<ProfileInfo></ProfileInfo>
                </ProfileItem>
                <ProfileItem>
                   <Logout/>
                </ProfileItem>
            </ProfileContainer>
            </Container>
          
        </>

    );
};

export default Profile;

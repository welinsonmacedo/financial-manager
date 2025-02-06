import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  border: 3px solid #007bff;
`;

const Info = styled.p`
  font-size: 16px;
  color: #333;
  margin: 8px 0;
`;

const UserDetailsView = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <Container>
      {user.profileImage && <ProfileImage src={user.profileImage} alt="Foto de Perfil" />}
      <Info><strong>Nome:</strong> {user.firstName} {user.lastName}</Info>
      <Info><strong>Idade:</strong> {user.age}</Info>
      <Info><strong>Telefone:</strong> {user.phone}</Info>
    </Container>
  );
};

export default UserDetailsView;

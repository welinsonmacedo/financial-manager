import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  background: #f3f3f3;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
`;

const ProfilePicture = () => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setProfileImage(userData.profileImage);
      }
    };
    fetchUser();
  }, []);

  return (
    <Container>
      {profileImage ? <Image src={profileImage} alt="Foto de Perfil" /> : <p>Sem foto</p>}
    </Container>
  );
};

export default ProfilePicture;

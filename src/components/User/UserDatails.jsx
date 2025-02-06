import { useState, useEffect } from "react";
import { db } from "../../config/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #007bff;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #0056b3;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ProfilePicture = ({ imageUrl }) => (
  <Container>
    <Title>Foto de Perfil</Title>
    {imageUrl ? <img src={imageUrl} alt="Foto de Perfil" style={{ width: "100%", borderRadius: "50%" }} /> : <p>Sem foto</p>}
  </Container>
);

const EditUser = ({ user, setUser, handleSubmit }) => (
  <Container>
    <Title>Editar Usuário</Title>
    <Form onSubmit={handleSubmit}>
      <Input type="text" name="firstName" placeholder="Nome" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} required />
      <Input type="text" name="lastName" placeholder="Sobrenome" value={user.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} required />
      <Input type="number" name="age" placeholder="Idade" value={user.age} onChange={(e) => setUser({ ...user, age: e.target.value })} required />
      <Input type="text" name="phone" placeholder="Telefone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} required />
      <Input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setUser)} />
      <Button type="submit">Salvar Alterações</Button>
    </Form>
  </Container>
);

const handleFileChange = (e, setUser) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setUser((prev) => ({ ...prev, profileImage: reader.result })); // Salva a imagem como Base64
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const UserDetails = () => {
  const [user, setUser] = useState({ firstName: "", lastName: "", age: "", phone: "", profileImage: "" });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserId(querySnapshot.docs[0].id);
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userId) {
        await updateDoc(doc(db, "users", userId), user);
      } else {
        const docRef = await addDoc(collection(db, "users"), user);
        setUserId(docRef.id);
      }
      alert("Usuário salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert("Erro ao salvar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ProfilePicture imageUrl={user.profileImage} />
      <EditUser user={user} setUser={setUser} handleSubmit={handleSubmit} />
    </Container>
  );
};

export default UserDetails;

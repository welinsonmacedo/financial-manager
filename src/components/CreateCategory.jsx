import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCar, faPlane, faUtensils, faDog } from '@fortawesome/free-solid-svg-icons';
import { getAuth } from 'firebase/auth'; 
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../config/firebaseConfig';
import NavBar from './NavBar';
import { useAuthState } from 'react-firebase-hooks/auth';
const db = getFirestore(app);
const auth = getAuth(app); 
const user = auth.currentUser; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 gap: 10px;
  padding: 20px;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
justify-content: center;
  padding: 20px;
  gap: 10px;
  padding-top: 5rem;
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: #ffffff;
  font-weight: 700
`;
const Section = styled.div`
display: flex;
justify-content: center;
align-items: flex-start;
gap: 10px;


`
const ViewColor = styled.div`
width: 30px;
height: 30px;
border-radius: 100%;
background-color: ${({ color }) => color};
border: 2px solid gray;
`

const Input = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  width: 200px;
 
 
`;
const InputColor = styled.input`
  margin-bottom: 16px;
  padding: 8px;
  width: 30px;
height: 30px;
  opacity:0;
 
`;

const Button = styled.button`
   background-color: #30b94e;
  color: #ffffff;
  font-weight: 700;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  margin: 15px;
 
  cursor: pointer;
  &:hover {
    background-color: #15241c; 
  }
  @media (max-width: 900px) {
    width:100%;
  }
`;



const CreateCategory = ({ type }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
 
    const [user] = useAuthState(auth);
    
  

    const handleCreateCategory = async (e) => {
      e.preventDefault();
      try {
        
        if (user) {
          const categoryData = {
            name,
            color,
            type,
            userId: user.uid
          };
          const categoriesCollection = collection(db, type === 'expense' ? 'expenseCategories' : 'incomeCategories');
          await addDoc(categoriesCollection, categoryData);
          setName('');
          setColor('');
          alert('Categoria criada com sucesso!');
        } else {
          
          console.error('Usuário não autenticado');
          alert('Usuário não autenticado. Por favor, faça login para criar uma categoria.');
        }
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
      }
    };
    return (
        <Container>
          <NavBar/>
          
          
            <Form onSubmit={handleCreateCategory}>
            <h4>Criar Categoria de {type === 'expense' ? 'Despesa' : 'Receita'}</h4>
                <Label>Nome da Categoria:</Label>


                <Section ><ViewColor color={color}><InputColor title='Cor: click no circulo para selecionar a cor' type="color" value={color} onChange={(e) => setColor(e.target.value)} required /></ViewColor>  <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required /></Section>
                
              
                <Button type="submit">Criar Categoria</Button>
            </Form>
        </Container>
    );
};

export default CreateCategory;

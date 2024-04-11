import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';
import LaunchList from './LaunchList';
import BalanceSummary from './BalanceSummary';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCar, faPlane, faUtensils, faDog } from '@fortawesome/free-solid-svg-icons';

const db = getFirestore(app);

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 5rem;
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 900px) {
    max-width: 280px;
    width: 100%;
  }
`;

const Form = styled.form`
  display: grid;
  grid-gap: 10px;
  width: 400px;
  @media (max-width: 900px) {
    max-width: 280px;
    width: 100%;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #30b94e;
  color: #ffffff;
  font-weight: 700;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #15241c;
  }
`;

const SectionTitle = styled.p`
  margin-top: 20px;
  font-size: 1.5em;
`;

const LaunchForm = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState('expense');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const categoriesCollection = type === 'expense' ? 'expenseCategories' : 'incomeCategories';
          const categoriesQuery = query(collection(db, categoriesCollection), where('userId', '==', currentUser.uid));
          const categoriesSnapshot = await getDocs(categoriesQuery);
          const data = categoriesSnapshot.docs.map(doc => doc.data());
          setCategories(data);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
    fetchCategories();
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (category && amount && date && currentUser) {
      let payment = null;
      if (type === 'expense') {
        payment = false;
      }
      try {
        const newLaunch = { type, category, amount, date, payment, userId: currentUser.uid };
        const launchesCollection = collection(db, 'launches');
        await addDoc(launchesCollection, newLaunch);
        setCategory('');
        setAmount('');
        setDate('');
        alert('Lançamento adicionado com sucesso!');
      } catch (error) {
        console.error('Erro ao adicionar lançamento:', error);
        alert('Erro ao adicionar lançamento. Consulte o console para mais detalhes.');
      }
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  return (
    <>
      <NavBar />
      <Container>
        <FormContainer>
          <SectionTitle>Lançar Novo</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Tipo:</Label>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Categoria:</Label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Selecione a categoria</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    <span style={{ color: category.color }}>
                      <FontAwesomeIcon icon={category} /> {category.name}
                    </span>
                  </option>
                ))}
              </Select>
            </FormGroup>
            <FormGroup>
              <Label>Valor:</Label>
              <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Data Vencimento:</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={type === 'income'} /> {/* Desabilitar a entrada de data de vencimento quando o tipo for "receita" */}
            </FormGroup>
            <Button type="submit">Adicionar Lançamento</Button>
          </Form>
        </FormContainer>
        <LaunchList />
      </Container>
    </>
  );
};

export default LaunchForm;

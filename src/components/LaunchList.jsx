import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import CurrencyFormatter from './common/CurrencyFormatter';
import DateFormatter from './common/DateFormatter';

const db = getFirestore(app);

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: #30b94e;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 5px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const SectionTitle = styled.p`
  margin-top: 20px;
  font-size: 1.5em;
`;

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [filteredLaunches, setFilteredLaunches] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;
  const [incomeCategories, setIncomeCategories] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (currentUser) {
          const incomeCategoriesQuery = query(collection(db, 'incomeCategories'), where('userId', '==', currentUser.uid));
          const expenseCategoriesQuery = query(collection(db, 'expenseCategories'), where('userId', '==', currentUser.uid));
          const incomeCategoriesSnapshot = await getDocs(incomeCategoriesQuery);
          const expenseCategoriesSnapshot = await getDocs(expenseCategoriesQuery);
          const incomeCategoriesData = incomeCategoriesSnapshot.docs.map(doc => doc.data());
          const expenseCategoriesData = expenseCategoriesSnapshot.docs.map(doc => doc.data());
          setIncomeCategories(incomeCategoriesData);
          setExpenseCategories(expenseCategoriesData);
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };
  
    fetchCategories();
  }, [currentUser]);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        if (currentUser) {
          const launchesQuery = query(collection(db, 'launches'), where('userId', '==', currentUser.uid));
          const launchesSnapshot = await getDocs(launchesQuery);
          const launchesData = launchesSnapshot.docs.map(doc => doc.data());
          setLaunches(launchesData);
          setFilteredLaunches(launchesData);
        } else {
          console.log('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao buscar lançamentos:', error);
      }
    };
  
    fetchLaunches();
  }, [currentUser]);

  const handleFilter = () => {
    let filtered = launches;
  
    // Filtrar por tipo
    if (selectedType) {
      filtered = filtered.filter(launch => launch.type === selectedType);
    }
  
    // Filtrar por categoria, apenas se uma categoria for selecionada
    if (selectedCategory) {
      filtered = filtered.filter(launch => launch.category === selectedCategory);
    }
  
    setFilteredLaunches(filtered);
  };
  

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
    handleFilter();
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
    handleFilter();
  };

  return (
    <Container>
      <SectionTitle>Lançamentos</SectionTitle>
      <div>
        <Label htmlFor="type">Tipo:</Label>
        <Select id="type" value={selectedType} onChange={handleChangeType}>
          <option value="">Todos</option>
          {incomeCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </Select>
      </div>
      <div>
        <Label htmlFor="category">Categoria:</Label>
        <Select id="category" value={selectedCategory} onChange={handleChangeCategory}>
          <option value="">Todas</option>
          {expenseCategories.map(category => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </Select>
      </div>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Categoria</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {filteredLaunches.map((launch, index) => (
            <TableRow key={index}>
              <TableCell>{launch.type}</TableCell>
              <TableCell>{launch.category}</TableCell>
              <TableCell><CurrencyFormatter value={launch.amount} ></CurrencyFormatter></TableCell>
              <TableCell><DateFormatter date={launch.date}></DateFormatter></TableCell>
              
              
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default LaunchList;

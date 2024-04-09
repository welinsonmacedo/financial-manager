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
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        if (currentUser) {
          const launchesQuery = query(collection(db, 'launches'), where('userId', '==', currentUser.uid));
          const launchesSnapshot = await getDocs(launchesQuery);
          const launchesData = launchesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setLaunches(launchesData);
        } else {
          console.log('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao buscar lançamentos:', error);
      }
    };
  
    fetchLaunches();
  }, [currentUser]);

  useEffect(() => {
    const calculateTotals = () => {
      let totalIncome = 0;
      let totalExpense = 0;

      launches.forEach(launch => {
        if (new Date(launch.date).getMonth() + 1 === selectedMonth) {
          if (launch.type === 'income') {
            totalIncome += parseFloat(launch.amount);
          } else {
            totalExpense += parseFloat(launch.amount);
          }
        }
      });

      setTotalIncome(totalIncome);
      setTotalExpense(totalExpense);
    };

    calculateTotals();
  }, [launches, selectedMonth]);

  const handleChangeMonth = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  return (
    <Container>
      <SectionTitle>Lançamentos</SectionTitle>
      <div>
        <Label htmlFor="month">Mês:</Label>
        <Select id="month" value={selectedMonth} onChange={handleChangeMonth}>
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </Select>
      </div>
      <StyledTable>
        <TableHead>
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
          </tr>
        </TableHead>
        <tbody>
          {launches
            .filter(launch => new Date(launch.date).getMonth() + 1 === selectedMonth)
            .map((launch) => (
              <TableRow key={launch.id}>
                <TableCell>{launch.type === 'expense' ? 'Despesa' : 'Receita'}</TableCell>
                <TableCell>{launch.category}</TableCell>
                <TableCell><CurrencyFormatter value={launch.amount} /></TableCell>
                <TableCell><DateFormatter date={launch.date} /></TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell><strong>Total Receita</strong></TableCell>
            <TableCell></TableCell>
            <TableCell><strong><CurrencyFormatter value={totalIncome} /></strong></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Total Despesa</strong></TableCell>
            <TableCell></TableCell>
            <TableCell><strong><CurrencyFormatter value={totalExpense} /></strong></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Saldo Final</strong></TableCell>
            <TableCell></TableCell>
            <TableCell><strong><CurrencyFormatter value={totalIncome - totalExpense} /></strong></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default LaunchList;

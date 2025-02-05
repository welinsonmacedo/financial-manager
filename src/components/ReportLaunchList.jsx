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



const TableHead = styled.thead`
  background-color: #2a302b;
  color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
   
  }
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  color:#fff;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 5px;
  color:#fff;
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
  color:#fff;
`;
const StyledTable = styled.table`
 width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
  
    overflow-x: auto;
    display: block;
    width: 100%;

   
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
      color:#fff;
    }
    tbody tr {
      margin-bottom: 10px;
      color:#fff;
    }
    th,
    td {
      text-align: left;
      border-bottom: none;
      padding: 8px;
      color:#fff;
    }
    th {
    
      color: #130c0c;
      display: none;
    }
    td {
      border-bottom: 1px solid #ddd;
    }
  }
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
        const launchDate = new Date(launch.dateRegister);
        if (launchDate.getMonth() + 1 === selectedMonth) {
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

  const filteredLaunches = launches.filter(launch => {
    const launchDate = new Date(launch.dateRegister);
    return launchDate.getMonth() + 1 === selectedMonth;
  });

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
      <StyledTable className="responsive-table">
        <TableHead>
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data de Lançamento</th>
            <th>Data de Vencimento</th>
          </tr>
        </TableHead>
        <tbody>
          {filteredLaunches.map((launch) => (
            <TableRow key={launch.id}>
              <TableCell style={launch.type === 'income' ? { backgroundColor: '#58a551', color: '#29032b' } : { backgroundColor: '#ec9d41', color: '#cec8c8' }}>
                {launch.type === 'income' ? 'Receita' : 'Despesa'}
              </TableCell>
              <TableCell>{launch.category}</TableCell>
              <TableCell><CurrencyFormatter value={launch.amount} /></TableCell>
              <TableCell><DateFormatter date={launch.dateRegister} /></TableCell>
              <TableCell>{launch.dateExpired ? <DateFormatter date={launch.dateExpired} /> : 'N/A'}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell><strong>Total Receita</strong></TableCell>
            <TableCell></TableCell>
            <TableCell><strong><CurrencyFormatter value={totalIncome} /></strong></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Total Despesa</strong></TableCell>
            <TableCell></TableCell>
            <TableCell><strong><CurrencyFormatter value={totalExpense} /></strong></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Saldo Final</strong></TableCell>
            <TableCell></TableCell>
            <TableCell><strong><CurrencyFormatter value={totalIncome - totalExpense} /></strong></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default LaunchList;

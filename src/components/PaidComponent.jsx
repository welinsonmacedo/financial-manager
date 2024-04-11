import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, getDocs, where, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import CurrencyFormatter from './common/CurrencyFormatter';
import DateFormatter from './common/DateFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
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
    }
    tbody tr {
      margin-bottom: 10px;
    }
    th,
    td {
      text-align: left;
      border-bottom: none;
      padding: 8px;
    }
    th {
      background-color: #30b94e;
      color: #fff;
      display: none;
    }
    td {
      border-bottom: 1px solid #ddd;
    }
  }
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

const PaidComponent = () => {
  const [launches, setLaunches] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        if (currentUser) {
          const launchesQuery = query(collection(db, 'launches'), where('userId', '==', currentUser.uid), where('payment', '==', true));
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

  const handleDelete = async (launchId) => {
    if (window.confirm('Tem certeza que deseja apagar este lançamento?')) {
      try {
        await deleteDoc(doc(db, 'launches', launchId));
        setLaunches(prevLaunches => prevLaunches.filter(launch => launch.id !== launchId));
      } catch (error) {
        console.error('Erro ao apagar lançamento:', error);
      }
    }
  };

  

  const handleChangeMonth = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  }
  return (
    <Container>
      <SectionTitle>CONTAS PAGAS</SectionTitle>
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
            <th>Data Lançamento</th>
            <th>Vencimento</th>
           
          </tr>
        </TableHead>
        <tbody>
          {launches
            .filter(launch => new Date(launch.dateRegister).getMonth() + 1 === selectedMonth)
            .map((launch) => (
              <TableRow key={launch.id}>
                <TableCell style={{ backgroundColor: '#ec9d41',color:'#fff' }}>Despesa</TableCell>
                <TableCell>{launch.category}</TableCell>
                <TableCell><CurrencyFormatter value={launch.amount} /></TableCell>
                <TableCell><DateFormatter date={launch.dateRegister} /></TableCell>
                <TableCell><DateFormatter date={launch.dateExpired} /></TableCell>
               
              </TableRow>
            ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default PaidComponent;

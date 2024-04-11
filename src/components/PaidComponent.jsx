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
  const [selectedType, setSelectedType] = useState('');
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        if (currentUser) {
          const launchesQuery = query(collection(db, 'launches'), where('userId', '==', currentUser.uid), where('payment', '==', true)); // Filtrar apenas contas pagas
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

  const handlePaymentToggle = async (launchId, paymentStatus) => {
    try {
      await updateDoc(doc(db, 'launches', launchId), {
        payment: !paymentStatus
      });
      setLaunches(prevLaunches =>
        prevLaunches.map(launch =>
          launch.id === launchId ? { ...launch, payment: !paymentStatus } : launch
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status de pagamento:', error);
    }
  };

  return (
    <Container>
      <SectionTitle>CONTAS PAGAS</SectionTitle>

      <StyledTable>
        <TableHead>
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Pago</th>
          </tr>
        </TableHead>
        <tbody>
          {launches.map((launch) => (
            <TableRow key={launch.id}>
              <TableCell>Despesa</TableCell>
              <TableCell>{launch.category}</TableCell>
              <TableCell><CurrencyFormatter value={launch.amount} /></TableCell>
              <TableCell><DateFormatter date={launch.date} /></TableCell>
              <TableCell>
                <button onClick={() => handlePaymentToggle(launch.id, launch.payment)}>
                  {launch.payment ? (
                    <FontAwesomeIcon icon={faCheckCircle} color='green' />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} color='red' />
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default PaidComponent;

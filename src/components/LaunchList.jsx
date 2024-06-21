import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, onSnapshot, where, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import CurrencyFormatter from './common/CurrencyFormatter';
import DateFormatter from './common/DateFormatter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faUndo, faCheck } from '@fortawesome/free-solid-svg-icons';
import CustomAlert from './common/CustomAlert';


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
const ButtonCustom = styled.button`
padding: 7px;
border: none;
border-radius: 5px;
font-weight: 600;
color: #ffff;
`;

const LaunchList = () => {
  const [launches, setLaunches] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [user] = useAuthState(auth);
  const currentUser = auth.currentUser;
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false); 

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'launches'), where('userId', '==', currentUser.uid)), (snapshot) => {
      const launchesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLaunches(launchesData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = async (launchId) => {
    if (window.confirm('Tem certeza que deseja apagar este lançamento?')) {
    
      try {
        await deleteDoc(doc(db, 'launches', launchId));
        setAlertType('sucess');
        setAlertMessage('Apagado com sucesso');
        setShowAlert(true);
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
  
     
      const alertMessage = paymentStatus ? 'Pagamento cancelado com sucesso!' : 'Despesa paga com sucesso!';
      
    
      setAlertType('success');
      setAlertMessage(alertMessage);
      setShowAlert(true);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Erro ao pagar despesa, tente novamente!');
      setShowAlert(true);
      console.error('Erro ao atualizar status de pagamento:', error);
    }
  };
  

  const handleChangeType = (e) => {
    setSelectedType(e.target.value);
  };
  const handleCloseAlert = () => {
    setShowAlert(false); 
  };

  return (
    <Container>
      <SectionTitle>Lançamentos</SectionTitle>
      <div>
        <Label htmlFor="type">Tipo:</Label>
        <Select id="type" value={selectedType} onChange={handleChangeType}>
          <option value="">Todos</option>
          <option value="expense">Despesa</option>
          <option value="income">Receita</option>
        </Select>
      </div>
      <StyledTable>
        <TableHead>
          <tr>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Vencimento</th>
            <th>Situação</th>
            <th>Excluir</th>
          </tr>
        </TableHead>
        <tbody>
        {showAlert && (
              <CustomAlert
                type={alertType}
                message={alertMessage}
                showAlert={showAlert}
                onClose={handleCloseAlert}
              />
            )}
          {launches
            .filter(launch => !selectedType || launch.type === selectedType)
            .map((launch) => (
              <TableRow key={launch.id}>
                <TableCell style={launch.type === 'income' ? { backgroundColor: '#55ff6f', color: '#fff' } : { backgroundColor: '#ec9d41', color: '#fff' }}>
                  {launch.type === 'income' ? 'Receita' : 'Despesa'}
                </TableCell>

                <TableCell>{launch.category}</TableCell>
                <TableCell><CurrencyFormatter value={launch.amount} /></TableCell>
                <TableCell>{launch.type === 'expense' ? <DateFormatter date={launch.dateExpired} /> : <span style={{ color: 'green' }}>-</span>}</TableCell>
                <TableCell>
                  {launch.type === 'expense' ? (
                    <ButtonCustom onClick={() => handlePaymentToggle(launch.id, launch.payment)} style={{ backgroundColor: launch.payment ? 'green' : 'red' }}>
                      {launch.payment ?<p>Pago</p> :<p>Pendente</p>}
                    </ButtonCustom>
                  ) : (
                    <span style={{ color: 'green' }}>-</span>
                  )}
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(launch.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} color='red' cursor='pointer' border='none' />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </tbody>
      </StyledTable>
    </Container>
  );
};

export default LaunchList;

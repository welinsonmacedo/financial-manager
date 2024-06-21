import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';
import CurrencyFormatter from './common/CurrencyFormatter';

const db = getFirestore(app);

const Container = styled.div`
  max-width: 600px;
  max-height: 200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ color }) => color};
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap:2rem;
`;

const Title = styled.p`
 
  font-size: 1.5em;
`;

const BalanceLabel = styled.span`
  font-weight: bold;
`;

const BalanceValueContainer = styled.div`
  font-size: 2em;
`;

const BalanceComponent = () => {
  const [balance, setBalance] = useState(0);
  const [balanceColor, setBalanceColor] = useState('#81f891');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const fetchMonthlyData = async () => {
      try {
        const userId = currentUser.uid;

        
        const incomeQuery = query(collection(db, 'launches'),
          where('type', '==', 'income'),
          where('userId', '==', userId)
        );
        const incomeSnapshot = await getDocs(incomeQuery);

        let incomeTotal = 0;
        incomeSnapshot.forEach(doc => {
          incomeTotal += parseFloat(doc.data().amount);
        });

        
        const expenseQuery = query(collection(db, 'launches'),
          where('type', '==', 'expense'),
          where('userId', '==', userId),
          where('payment', '==', true)
        );
        const expenseSnapshot = await getDocs(expenseQuery);

        let expenseTotal = 0;
        expenseSnapshot.forEach(doc => {
          expenseTotal += parseFloat(doc.data().amount);
        });

        
        const currentBalance = incomeTotal - expenseTotal;

        
        let color;
        if (expenseTotal <= incomeTotal * 0.5) {
          color = '#81f891';
        } else if (expenseTotal <= incomeTotal * 0.8) {
          color = '#ffd700';
        } else {
          color = '#ff6347';
        }

        
        setBalance(currentBalance);
        setBalanceColor(color);
      } catch (error) {
        console.error('Erro ao buscar dados mensais:', error);
      }
    };

    fetchMonthlyData();
  }, []);

  return (
    <Container color={balanceColor}>
      <Title>Saldo Atual</Title>
    
      <BalanceValueContainer>
        <CurrencyFormatter value={balance}></CurrencyFormatter> 
      </BalanceValueContainer>
     
    </Container>
  );
};

export default BalanceComponent;

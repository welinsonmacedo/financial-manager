import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { getFirestore, collection, getDocs, where, query } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';

const db = getFirestore(app);

const Container = styled.div`
  padding-top: 4rem;
  text-align: center;
`;

const Greeting = styled.p`
  font-size: 1.2em;
`;

const UserName = styled.span`
  font-weight: bold;
`;

const SectionTitle = styled.p`
  margin-top: 20px;
  font-size: 1.5em;
`;

const Section = styled.div`
  margin-top: 10px;
`;

const SectionInfo = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
`;

const SectionInfoGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 2px 2px #e7e7df;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const QuickAccess = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
`;

const Action = styled(NavLink)`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Icon = styled.span`
  font-size: 2em;
  margin-bottom: 10px;
`;

const Title = styled.p`
  font-size: 1.1em;
`;

const MainDashboard = ({ name }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [monthlyExpense, setMonthlyExpense] = useState(0);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (currentUser) {
          const userId = currentUser.uid;
          const currentDate = new Date();
          const currentMonth = currentDate.getMonth() + 1; 

          
          const revenueQuery = query(collection(db, 'launches'),
            where('userId', '==', userId),
            where('type', '==', 'income')
          );
          const revenueSnapshot = await getDocs(revenueQuery);
          let totalRevenue = 0;
          revenueSnapshot.forEach(doc => {
            const data = doc.data();
            const launchDate = new Date(data.date); 
            if (launchDate.getMonth() + 1 === currentMonth) {
              totalRevenue += parseFloat(data.amount);
            }
          });
          setMonthlyRevenue(totalRevenue);

          
          const expenseQuery = query(collection(db, 'launches'),
            where('userId', '==', userId),
            where('type', '==', 'expense')
          );
          const expenseSnapshot = await getDocs(expenseQuery);
          let totalExpense = 0;
          expenseSnapshot.forEach(doc => {
            const data = doc.data();
            const launchDate = new Date(data.date); 
            if (launchDate.getMonth() + 1 === currentMonth) {
              totalExpense += parseFloat(data.amount);
            }
          });
          setMonthlyExpense(totalExpense);
        } else {
          console.log('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const now = new Date();
  const hour = now.getHours();
  let greeting = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Bom dia';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Boa tarde';
  } else if (hour >= 0 && hour < 5) {
    greeting = 'Boa Madrugada';
  } else {
    greeting = 'Boa noite';
  }

  return (
    <Container>
      <Greeting>{greeting}, <UserName>{name}</UserName>!</Greeting>
      <SectionInfo>
        <SectionInfoGroup>
          <SectionTitle>Receita mensal</SectionTitle>
          <Section>
            <p>R$ {monthlyRevenue.toFixed(2)}</p>
          </Section>
        </SectionInfoGroup>
        <SectionInfoGroup>
          <SectionTitle>Despesa mensal</SectionTitle>
          <Section>
            <p>R$ {monthlyExpense.toFixed(2)}</p>
          </Section>
        </SectionInfoGroup>
      </SectionInfo>
      <SectionTitle>Acesso rápido</SectionTitle>
      <QuickAccess>
        <Action to='/launches'>
            <Icon><FontAwesomeIcon icon={faDollarSign} color='green' /></Icon>
            <Title>Lançamentos</Title>
        </Action>
        <Action to='/reports'>
          <Icon><FontAwesomeIcon icon={faMoneyBillAlt} color='red' /></Icon>
          <Title>Relatórios</Title>
        </Action>
      </QuickAccess>
    </Container>
  );
};

export default MainDashboard;

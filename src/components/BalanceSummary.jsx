import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app, auth } from '../config/firebaseConfig';

const db = getFirestore(app);

const Container = styled.div`
  max-width: 600px;
  max-height: 100px;
  margin: 20px auto;
  padding: 20px;
  background-color: ${({ color }) => color};
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BalanceLabel = styled.span`
  font-weight: bold;
`;

const BalanceValue = styled.span`
  font-size: 1.2em;
`;

const BalanceSummary = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balanceColor, setBalanceColor] = useState('#81f891'); // Cor padrão verde
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Mês atual como valor padrão

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return; // Sai da função se o usuário não estiver logado

    const fetchMonthlyData = async () => {
      try {
        // Obtém o ano e mês selecionados
        const currentYear = new Date().getFullYear();
        const formattedSelectedMonth = selectedMonth.toString().padStart(2, '0');

        console.log('Usuário atual:', currentUser.uid);
        console.log('Mês selecionado:', selectedMonth);

        const userId = currentUser.uid;

        const incomeQuery = query(collection(db, 'launches'),
          where('type', '==', 'income'),
          where('userId', '==', userId),
          where('date', '>=', `${currentYear}-${formattedSelectedMonth}-01`),
          where('date', '<=', `${currentYear}-${formattedSelectedMonth}-31`)
        );
        const incomeSnapshot = await getDocs(incomeQuery);
        console.log('Consulta de receitas:', incomeQuery);
        console.log('Documentos de receitas:', incomeSnapshot.docs);

        let incomeTotal = 0;
        incomeSnapshot.forEach(doc => {
          incomeTotal += parseFloat(doc.data().amount); // Converte para número antes de somar
        });
        console.log('Total de receitas:', incomeTotal);
        setTotalIncome(incomeTotal);

        const expenseQuery = query(collection(db, 'launches'),
          where('type', '==', 'expense'),
          where('userId', '==', userId),
          where('date', '>=', `${currentYear}-${formattedSelectedMonth}-01`),
          where('date', '<=', `${currentYear}-${formattedSelectedMonth}-31`)
        );

        const expenseSnapshot = await getDocs(expenseQuery);
        console.log('Consulta de despesas:', expenseQuery);
        console.log('Documentos de despesas:', expenseSnapshot.docs);

        let expenseTotal = 0;
        expenseSnapshot.forEach(doc => {
          expenseTotal += parseFloat(doc.data().amount); // Converte para número antes de somar
        });
        console.log('Total de despesas:', expenseTotal);
        setTotalExpense(expenseTotal);

        const currentBalance = incomeTotal - expenseTotal;
        console.log('Saldo atual:', currentBalance);

        let color;
        if (expenseTotal <= incomeTotal * 0.5) {
          color = '#81f891'; // Verde se o gasto for até 50% do saldo total
        } else if (expenseTotal <= incomeTotal * 0.8) {
          color = '#ffd700'; // Laranja se o gasto for até 80% do saldo total
        } else {
          color = '#ff6347'; // Vermelho se o gasto for acima de 80% do saldo total
        }
        setBalanceColor(color);
      } catch (error) {
        console.error('Erro ao buscar dados mensais:', error);
      }
    };

    fetchMonthlyData();
  }, [selectedMonth]);

  return (
    <Container color={balanceColor}>
      <Title>Resumo do Saldo</Title>
      <p>Mês</p>
      <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
          <option key={month} value={month}>{month}</option>
        ))}
      </select>
      <BalanceContainer>
        <BalanceLabel>Receita Total do Mês:</BalanceLabel>
        <BalanceValue>R$:{totalIncome.toFixed(2)} BRL</BalanceValue>
      </BalanceContainer>
      <BalanceContainer>
        <BalanceLabel>Despesa do Mês:</BalanceLabel>
        <BalanceValue>R$:{totalExpense.toFixed(2)} BRL</BalanceValue>
      </BalanceContainer>
      <BalanceContainer>
        <BalanceLabel>Saldo Atual:</BalanceLabel>
        <BalanceValue>R$:{(totalIncome - totalExpense).toFixed(2)} BRL</BalanceValue>
      </BalanceContainer>
    </Container>
  );
};

export default BalanceSummary;

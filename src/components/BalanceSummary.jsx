import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  max-height: 100px;
  margin: 20px auto;
  padding: 20px;
  background-color: #81f891;
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

const BalanceSummary = ({ balance }) => {
  // Verifica se balance é um número e se não é NaN (Not a Number)
  if (typeof balance === 'number' && !isNaN(balance)) {
    return (
      <Container>
        <Title>Resumo do Saldo</Title>
        <BalanceContainer>
          <BalanceLabel>Saldo Atual:</BalanceLabel>
          <BalanceValue>R${balance.toFixed(2)} BRL</BalanceValue>
        </BalanceContainer>
      </Container>
    );
  } else {
    // Caso balance seja indefinido, nulo ou não seja um número válido
    return (
      <Container>
        <Title>Resumo do Saldo</Title>
        <BalanceContainer>
          <BalanceLabel>Saldo Atual:</BalanceLabel>
          <BalanceValue>R$0.00 BRL</BalanceValue>
        </BalanceContainer>
      </Container>
    );
  }
};

export default BalanceSummary;

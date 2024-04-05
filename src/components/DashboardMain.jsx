import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faDollarSign, faExchangeAlt, faFileImport } from '@fortawesome/free-solid-svg-icons';

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

const SectionTitle = styled.h2`
  margin-top: 20px;
  font-size: 1.5em;
`;

const Section = styled.div`
  margin-top: 10px;
`;

const QuickAccess = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Action = styled.div`
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
  const now = new Date();
  const hour = now.getHours();
  let greeting = '';

  if (hour >= 5 && hour < 12) {
    greeting = 'Bom dia';
  } else if (hour >= 12 && hour < 18) {
    greeting = 'Boa tarde';
  } else if (hour >= 0 && hour < 5) {
    greeting = 'Boa Madrugada';
  } 
  else {
    greeting = 'Boa noite';
  }

  return (
    <Container>
      <Greeting>{greeting}, <UserName>{name}</UserName>!</Greeting>
      <SectionTitle>Receita mensal</SectionTitle>
      <Section>
        <p>R$ 0,00</p>
      </Section>
      <SectionTitle>Despesa mensal</SectionTitle>
      <Section>
        <p>R$ 0,00</p>
      </Section>
      <Section>
        <a href="/reports">Ver relatórios</a>
      </Section>
      <SectionTitle>Acesso rápido</SectionTitle>
      <QuickAccess>
        <Action>
          <Icon><FontAwesomeIcon icon={faDollarSign} /></Icon>
          <Title>Receita</Title>
        </Action>
        <Action>
          <Icon><FontAwesomeIcon icon={faMoneyBillAlt} /></Icon>
          <Title>Despesa</Title>
        </Action>
        <Action>
          <Icon><FontAwesomeIcon icon={faExchangeAlt} /></Icon>
          <Title>Transf.</Title>
        </Action>
        <Action>
          <Icon><FontAwesomeIcon icon={faFileImport} /></Icon>
          <Title>Importar</Title>
        </Action>
      </QuickAccess>
    </Container>
  );
};

export default MainDashboard

import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faDollarSign, faExchangeAlt, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


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
const Button = styled(NavLink)`
  background-color: #30b94e;
  color: #ffffff;
  font-weight: 700;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #15241c; 
  }
  @media (max-width: 900px) {
    
  }
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
      <SectionInfo>
        <SectionInfoGroup>
          <SectionTitle>Receita mensal</SectionTitle>
          <Section>
            <p>R$ 0,00</p>
          </Section>
        </SectionInfoGroup>
        <SectionInfoGroup>
          <SectionTitle>Despesa mensal</SectionTitle>
          <Section>
            <p>R$ 0,00</p>
          </Section>
        </SectionInfoGroup>


        <Section>
          <Button to='/reports'>Ver relatórios</Button>
        </Section>
      </SectionInfo>
      <SectionTitle>Acesso rápido</SectionTitle>
      <QuickAccess>
        <Action>
          <Icon><FontAwesomeIcon icon={faDollarSign} color='green' /></Icon>
          <Title>Receita</Title>
        </Action>
        <Action>
          <Icon><FontAwesomeIcon icon={faMoneyBillAlt} color='red' /></Icon>
          <Title>Despesa</Title>
        </Action>

      </QuickAccess>
    </Container>
  );
};

export default MainDashboard

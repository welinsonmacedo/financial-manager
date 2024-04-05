import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt, faCog } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
text-align: center;
  border: 2px solid #e2e2d9;
  max-width: 400px;
  min-width: 250px;
  min-height: 250px;
  max-height: 250px;
  padding: 15px;
  width: 100%;

`;

const Title = styled.p`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

const TotalAmount = styled.div`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

const Button = styled.button`
   background-color: #30b94e;
  color: #ffffff;
  font-weight: 700;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #15241c; 
  }
  @media (max-width: 900px) {
    
  }
`;

const Icon = styled.span`
  font-size: 1.2em;
  margin-left: 10px;
  cursor: pointer;
`;

const BillsComponent = () => {
  const totalBills = 5;
  const totalAmount = 500;

  return (
    <Container>
      <Title>Minhas Faturas</Title>
      <TotalAmount>Total: R$ {totalAmount.toFixed(2)}</TotalAmount>
      <Button><FontAwesomeIcon icon={faCog} /> Gerenciar Cartões</Button>
    </Container>
  );
};

export default BillsComponent;

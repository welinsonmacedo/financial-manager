import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCog } from '@fortawesome/free-solid-svg-icons';

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

const Balance = styled.div`
  font-size: 1.2em;
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

const BalanceComponent = () => {
  const [showBalance, setShowBalance] = useState(true);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <Container>
      <Title>Saldo Geral</Title>
      <Balance>
        {showBalance ? 'R$ 1000,00' : '*****'}
        <Icon onClick={toggleBalanceVisibility}>
          <FontAwesomeIcon icon={showBalance ? faEyeSlash : faEye} />
        </Icon>
      </Balance>
      <Button><FontAwesomeIcon icon={faCog} /> Gerenciar Saldo</Button>
    </Container>
  );
};

export default BalanceComponent;

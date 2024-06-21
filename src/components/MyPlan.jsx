import React from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';

const PlanContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-top: 150px;
  border: 1px solid gray;
`;

const PlanTitle = styled.h2`
  color: #333;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const PlanDetail = styled.p`
  color: #666;
  font-size: 1.2em;
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
`;

const MyPlan = () => {
  return (
    <>
    <NavBar/>
    <PlanContainer>
      <PlanTitle>Meu Plano</PlanTitle>
      <PlanDetail>Plano Atual: Plano Básico</PlanDetail>
      <PlanDetail>Limite de Lançamentos: 100 por mês</PlanDetail>
      <PlanDetail>Armazenamento: 1GB</PlanDetail>
      <PlanDetail>Preço: Gratuito</PlanDetail>
      <Button to="/updateplan">Atualizar Plano</Button>
    </PlanContainer>
    </>
    
  );
};

export default MyPlan;

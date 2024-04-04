import React from 'react';
import styled from 'styled-components';

const PricingContainer = styled.div`
  padding: 50px 20px;
  text-align: center;
`;

const PricingTitle = styled.h2`
  font-size: 2em;
  color: #333;
  margin-bottom: 30px;
`;

const PricingList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  }
`;

const Plan = styled.li`
  background-color: #f0e4e4;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
 margin: 0 10px;
  flex: 1;
  max-width: 250px;
  min-width: 250px;
`;

const PlanTitle = styled.h3`
  font-size: 1.5em;
  color: #007bff;
  margin-bottom: 15px;
`;

const PlanPrice = styled.p`
  font-size: 1.2em;
  color: #333;
  margin-bottom: 15px;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
`;

const Feature = styled.li`
  margin-bottom: 10px;
`;

const Pricing = () => {
  return (
    <PricingContainer id="pricing">
      <PricingTitle>Planos e Preços</PricingTitle>
      <PricingList>
        <Plan>
          <PlanTitle>Básico</PlanTitle>
          <PlanPrice>Grátis</PlanPrice>
          <PlanFeatures>
            <Feature>Contas ilimitadas</Feature>
            <Feature>Despesas ilimitadas</Feature>
            <Feature>Orçamento mensal</Feature>
            <Feature>Suporte por e-mail</Feature>
          </PlanFeatures>
        </Plan>
        <Plan>
          <PlanTitle>Pro</PlanTitle>
          <PlanPrice>$9.99/mês</PlanPrice>
          <PlanFeatures>
            <Feature>Todos os recursos do plano Básico</Feature>
            <Feature>Relatórios detalhados</Feature>
            <Feature>Suporte prioritário</Feature>
            <Feature>Importação de dados</Feature>
          </PlanFeatures>
        </Plan>
        <Plan>
          <PlanTitle>Premium</PlanTitle>
          <PlanPrice>$19.99/mês</PlanPrice>
          <PlanFeatures>
            <Feature>Todos os recursos do plano Pro</Feature>
            <Feature>Assessoria financeira personalizada</Feature>
            <Feature>Acesso exclusivo a webinars</Feature>
            <Feature>Gerente de conta dedicado</Feature>
          </PlanFeatures>
        </Plan>
      </PricingList>
    </PricingContainer>
  );
};

export default Pricing;

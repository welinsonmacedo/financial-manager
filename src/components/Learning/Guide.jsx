import React from 'react';
import styled from 'styled-components';

const GuideContainer = styled.div`
  background-color: #f5f5f5;
  padding: 50px 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: #02a002;
  margin-bottom: 30px;
  @media (max-width: 900px) {
    font-size: 1em;
  }
`;

const StepContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
`;

const Step = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const StepNumber = styled.div`
  font-size: 2em;
  color: #03bd2b;
  margin-bottom: 15px;
`;

const StepText = styled.p`
  font-size: 1.1em;
  color: #333;
`;

const Guide = () => {
  return (
    <GuideContainer>
      <SectionTitle>O guia para o seu sucesso financeiro</SectionTitle>
      <StepContainer>
        <Step>
          <StepNumber>01</StepNumber>
          <StepText>Suas contas e cartões num só lugar. Comece cadastrando suas contas e cartões para ter uma visão mais clara das suas finanças.</StepText>
        </Step>
        <Step>
          <StepNumber>02</StepNumber>
          <StepText>Cadastre todos os seus gastos. Garanta uma previsibilidade financeira poderosa cadastrando suas despesas em tempo real, de onde você estiver.</StepText>
        </Step>
        <Step>
          <StepNumber>03</StepNumber>
          <StepText>Saiba o destino de cada centavo. Mantenha tudo sob controle informando sua renda e ganhos extras para ter um ponto de partida.</StepText>
        </Step>
        <Step>
          <StepNumber>04</StepNumber>
          <StepText>Transformando em hábito. Lance os gastos do dia a dia, acompanhe os relatórios sempre que possível e assuma o controle do seu dinheiro.</StepText>
        </Step>
      </StepContainer>
    </GuideContainer>
  );
};

export default Guide;

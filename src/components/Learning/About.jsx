import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  padding: 6rem 20px;
  min-height: 80vh;
`;

const AboutTitle = styled.h2`
  font-size: 2em;
  color: #10fa1c;
  text-align: center;
  margin-bottom: 30px;
`;

const AboutContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: justify;
  color:#fff;
  
`;

const About = () => {
  return (
    <AboutContainer id="about">
      <AboutTitle>Gerente Financeiro</AboutTitle>
      <AboutContent>
        <p>
          É um sistema web desenvolvido para ajudar pessoas a terem um controle completo sobre suas finanças pessoais.
        </p>
        <p>
          Nosso objetivo é fornecer uma solução prática e eficiente para que você possa gerenciar suas receitas, despesas, investimentos e objetivos financeiros de forma fácil e segura.
        </p>
        <p>
          Com o Gerente Financeiro, você pode cadastrar suas contas bancárias, cartões de crédito, registrar suas despesas diárias, acompanhar seu orçamento mensal e receber insights valiosos sobre seus hábitos de gastos.
        </p>
        <p>
          Nossa equipe está empenhada em oferecer uma experiência intuitiva e amigável, tornando o controle financeiro uma tarefa simples e acessível para todos.
        </p>
        <p>
          Junte-se a nós e transforme a maneira como você lida com o seu dinheiro. Com o Gerente Financeiro, você estará no comando do seu futuro financeiro.
        </p>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;

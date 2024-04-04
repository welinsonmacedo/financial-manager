import React from 'react';
import styled from 'styled-components';

const FeaturesContainer = styled.div`
  background-color: #f5f5f5;
  padding: 50px 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2em;
  color: #05c22e;
  margin-bottom: 30px;
`;

const Feature = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5em;
  color: #03ad28;
  margin-bottom: 15px;
`;

const FeatureText = styled.p`
  font-size: 1.1em;
  color: #333;
`;

const Features = () => {
  return (
    <FeaturesContainer id="features">
      <SectionTitle>Controle total</SectionTitle>
      <Feature>
        <FeatureTitle>Você, no controle das suas finanças</FeatureTitle>
        <FeatureText>Com seu dinheiro organizado fica muito mais fácil planejar o futuro. Para te ajudar, o Organizze te mostra previsões valiosas das suas finanças.</FeatureText>
      </Feature>
      <Feature>
        <FeatureTitle>Tempo e dinheiro economizados</FeatureTitle>
        <FeatureText>Concentre suas informações financeiras em um único app, e não perca tempo abrindo todos os aplicativos de banco para checar seus gastos.</FeatureText>
      </Feature>
      <Feature>
        <FeatureTitle>Previsibilidade garantida</FeatureTitle>
        <FeatureText>As faturas de todos os seus cartões de crédito reunidas em um lugar só! Já imaginou? Tudo para garantir a previsibilidade que você precisa.</FeatureText>
      </Feature>
      <Feature>
        <FeatureTitle>Simplicidade de uso</FeatureTitle>
        <FeatureText>O sistema foi desenhado para ser intuitivo e tornar sua experiência cada vez mais natural. Em pouco tempo você consegue fazer um controle incrível do seu dinheiro!</FeatureText>
      </Feature>
      <Feature>
        <FeatureTitle>Sem anúncios</FeatureTitle>
        <FeatureText>Aqui você pode focar no que realmente importa: Sua organização financeira. Não te distraímos com propagandas ou ofertas de serviço de terceiros dentro do app.</FeatureText>
      </Feature>
      <Feature>
        <FeatureTitle>Suporte eficiente</FeatureTitle>
        <FeatureText>Dúvidas? Sugestões? Nosso suporte gente boa ajuda você! A gente tá aqui para resolver seus problemas e deixar sua vida mais tranquila.</FeatureText>
      </Feature>
    </FeaturesContainer>
  );
};

export default Features;

import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
padding: 9rem 5rem;
@media (max-width: 900px) {
  padding-top: 9rem;
  }
`
const BannerContainer = styled.div`
background-color: rgb(86, 8, 131);
  color: #ffffff;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 3rem;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
justify-content: center;
padding: 0;
  }
  
`;
const SectionText = styled.div`

`;
const SectionImg = styled.div`

`;
const BannerImg = styled.img`
width: 400px;
@media (max-width: 768px) {
    
   display: none;
  }
`;
const BannerSlogan = styled.p`
  font-size: 2.5em;
  margin-bottom: 20px;
  text-transform: uppercase;
  @media (max-width: 768px) {
    
    font-size: 1.5em;
   }
`;
const ColoredText = styled.span`
  color: #24da00; 
`;
const BannerText = styled.p`
  font-size: 1.5em;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    max-width: 80%;
    display: block;
    margin: 0 auto;
    font-size: 0.75em;
   }
`;

const Button = styled.button`
  background-color: #19d300;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight:700;
  cursor: pointer;
  &:hover {
    background-color: #d8c794;
    color: #000000; 
  }
`;


const BannerHome = () => {
    return (
        <Container id="home">
            <BannerContainer>
                <SectionText>
                    <BannerSlogan>
                        Transforme sua <ColoredText>gestão financeira </ColoredText> <br />com eficiência e simplicidade <br /> além dos limites da planilha
                    </BannerSlogan>
                    <BannerText>
                        Organize seu dinheiro em tempo real em uma solução completa, prática e segura, e garanta o controle total das suas finanças.
                    </BannerText>
                </SectionText>
                <SectionImg>
                    <BannerImg src="" />
                </SectionImg>


            </BannerContainer>
            <Button>Cadastrar</Button>
        </Container>

    );
};

export default BannerHome;

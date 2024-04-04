import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 30px 20px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FooterLogo = styled.img`
  width: 50px;
  margin-bottom: 20px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 15px;
  transition: color 0.3s ease;

  &:hover {
    color: #ffc107; /* Altere para a cor desejada no hover */
  }
`;

const FooterText = styled.p`
  font-size: 0.9em;
  margin-bottom: 10px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterLogo src="footer.png" alt="Logo" />
        <FooterLinks>
          <FooterLink href="#home">Página Inicial</FooterLink>
          <FooterLink href="#about">Quem Somos</FooterLink>
          <FooterLink href="#features">Recursos</FooterLink>
         
        </FooterLinks>
        <FooterText>WelinsonMacedo © {new Date().getFullYear()} GerenteFinanceiro. Todos os direitos reservados.</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

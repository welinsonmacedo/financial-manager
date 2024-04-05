import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Navbar = styled.nav`
  background-color: #ffffff;
  color: #000000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  width: auto;
  min-width: 100%;

  @media (max-width: 900px) {
   height: 100px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: left;
  gap: 2rem;
  }
`;

const Logo = styled.a`
  font-size: 1.5em;
  text-decoration: none;
  color: #fff;
  border-radius: 15px;
  width:auto;
  @media (max-width: 900px) {
   
   
  }
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  width: auto;
justify-content: center;
  @media (max-width: 900px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    margin-top: 250px;
  
    background-color: #ffffff;
    padding: 20px;
   
  }
`;

const MenuItem = styled.a`
  margin-right: 20px;
  font-size: 15px;
  font-weight: 500;
  &:hover {
    border-bottom: 2px solid gray;
    cursor: pointer;
    z-index: 2;
  }
  @media (max-width: 900px) {
    margin-right: 0;
    margin-bottom: 10px;
    font-size: 20px;
    width: 100%;
    display: block;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: #000000;
  font-size: 1.5em;
  cursor: pointer;
  display: none;
  width: 100%;

  @media (max-width: 900px) {
    display: flex;
  }
`;

const Img = styled.img`
  width: 350px;

  @media (max-width: 900px) {
    width: 250px;
  }
`;



const Button = styled(NavLink)`
  background-color: #59e778;
  color: #000;
  font-weight: 700;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #b6f5d5; 
  }
  @media (max-width: 900px) {
    
  }
`;

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsOpen(false); // Fechar o menu ao clicar em um item
    };

    return (
        <Navbar>
            <Logo onClick={() => scrollToSection('home')}>
                <Img src="GERENTEFINANCEIRO.png" alt="logotipo "  />
            </Logo>
            <Menu isOpen={isOpen}>
                <MenuItem onClick={() => scrollToSection('about')}>Visão Geral</MenuItem>
                <MenuItem onClick={() => scrollToSection('features')}>Lançamentos</MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>Relatórios</MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>Limite de Gastos</MenuItem>
                <MenuItem onClick={() => scrollToSection('features')}> <FontAwesomeIcon icon={faCog} /></MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}><FontAwesomeIcon icon={faBell} /></MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}> <FontAwesomeIcon icon={faUser} /></MenuItem>
                
            </Menu>
            <ToggleButton onClick={toggleMenu}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </ToggleButton>
        </Navbar>
    );
};

export default NavBar;

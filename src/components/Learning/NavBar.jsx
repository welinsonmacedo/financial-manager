import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = styled.nav`
  background-color: #ffffff;
  color: #000000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  width: 100%;

  @media (max-width: 768px) {
   height: 100px;
  
  }
`;

const Logo = styled.a`
  font-size: 1.5em;
  text-decoration: none;
  color: #fff;
  border-radius: 15px;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 41%;
    top: 165px;

    width: 100%;
    background-color: #ffffff;
    padding: 20px;
   
  }
`;

const MenuItem = styled.a`
  margin-right: 20px;
  font-size: 25px;
  font-weight: 500;
  &:hover {
    border-bottom: 2px solid gray;
    cursor: pointer;
    z-index: 2;
  }
  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    display: flex;
  }
`;
const Button = styled.button`
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
  @media (max-width: 768px) {
    
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
                <img src="GERENTEFINANCEIRO.png" alt="" width='300px' />
            </Logo>
            <Menu isOpen={isOpen}>
                <MenuItem onClick={() => scrollToSection('about')}>Quem somos</MenuItem>
                <MenuItem onClick={() => scrollToSection('features')}>Recursos</MenuItem>
                <MenuItem onClick={() => scrollToSection('pricing')}>Planos e preços</MenuItem>
                <MenuItem onClick={() => scrollToSection('login')}>Login</MenuItem>
                <Button>Cadastrar</Button>
            </Menu>
            <ToggleButton onClick={toggleMenu}>
                {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
            </ToggleButton>
        </Navbar>
    );
};

export default NavBar;

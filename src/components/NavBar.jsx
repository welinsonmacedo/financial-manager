import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const Navbar = styled.div`
  background-color: #ffffff;
  color: #000000;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: fixed;
  min-width: 100%;
  width: auto;

  @media (max-width: 900px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.a`
  font-size: 1.5em;
  text-decoration: none;
  color: #fff;
  border-radius: 15px;
  width: auto;

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
    margin: 0;
    right: 190px;
    width: 100%;
    background-color: #ffffff;
    padding: 5px;
  }
`;

const MenuItem = styled(NavLink)`
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
    padding: 5px;
  }
  &:hover {
    background-color: #9ed1b6;
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
  display: flex;
  width: 350px;

  @media (max-width: 900px) {
    display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};
    width: 250px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  background-color: #ffffff;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownMenuItem = styled(NavLink)`
  padding: 10px;
  text-decoration: none;
  display: block;
  color: black;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfigMenuOpen, setIsConfigMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleConfigMenu = () => {
    setIsConfigMenuOpen(!isConfigMenuOpen);
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
        <Img isOpen={isOpen} src="GERENTEFINANCEIRO.png" alt="logotipo " />
      </Logo>
      <Menu isOpen={isOpen}>
        <MenuItem to="/home">Visão Geral</MenuItem>
        <MenuItem to="/launches">Lançamentos</MenuItem>
        <MenuItem onClick={() => scrollToSection('pricing')}>Relatórios</MenuItem>
        <MenuItem onClick={() => scrollToSection('pricing')}>Limite de Gastos</MenuItem>
        <MenuItem onClick={toggleConfigMenu}>
          <FontAwesomeIcon icon={faCog} />
          <DropdownMenu isOpen={isConfigMenuOpen}>
            <DropdownMenuItem to="/config">Categorias</DropdownMenuItem>
            <DropdownMenuItem to="/config">Contas</DropdownMenuItem>
            <DropdownMenuItem to="/config">Cartões de Crédito</DropdownMenuItem>
            <DropdownMenuItem to="/config">Preferências</DropdownMenuItem>
            <DropdownMenuItem to="/config">Meu Plano</DropdownMenuItem>
            {/* Adicione mais itens de menu conforme necessário */}
          </DropdownMenu>
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('pricing')}>
          <FontAwesomeIcon icon={faBell} />
        </MenuItem>
        <MenuItem onClick={() => scrollToSection('pricing')}>
          <FontAwesomeIcon icon={faUser} />
        </MenuItem>
      </Menu>
      <ToggleButton onClick={toggleMenu}>
        {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </ToggleButton>
    </Navbar>
  );
};

export default NavBar;

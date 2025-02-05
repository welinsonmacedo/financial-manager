import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faCog, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import UserStatus from './../config/UserStatus';
import Notifications from './Notifications';

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
  cursor: pointer;

  @media (max-width: 900px) {
    display: none;
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
    padding: 1.5rem;
    padding-top: 3rem;
  }
`;

const MenuItem = styled(NavLink)`
  margin-right: 20px;
  font-size: 15px;
  font-weight: 500;
  color:#000;
 
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
    margin:0 auto;
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

  @media (max-width: 900px) {
    display:flex;
    position:absolute;
    top:20px;
    left:90%;
    padding-left: 5px;
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
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // Adicione o estado para controlar a abertura das notificações

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleConfigMenu = () => {
    setIsConfigMenuOpen(!isConfigMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <Navbar>
      <ToggleButton onClick={toggleMenu}>
        {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </ToggleButton>
  
      <Logo onClick={() => scrollToSection('home')}>
        <Img isOpen={isOpen} src="GERENTEFINANCEIRO.png" alt="logotipo " />
      </Logo>

      <Menu isOpen={isOpen}>
        <MenuItem to="/home">Visão Geral</MenuItem>
        <MenuItem to="/launches">Lançamentos</MenuItem>
        <MenuItem to="/reports">Relatórios</MenuItem>
        <MenuItem onClick={toggleConfigMenu}>
          <span className="menu-item-label">Configurações</span>
          <DropdownMenu isOpen={isConfigMenuOpen}>
            <DropdownMenuItem to="/categoryexpense">Cadastro Categoria Despesas</DropdownMenuItem>
            <DropdownMenuItem to="/categoryincome">Cadastro Categoria Receitas</DropdownMenuItem>
            <DropdownMenuItem to="/myplan">Meu Plano</DropdownMenuItem>
          </DropdownMenu>
        </MenuItem>
        <MenuItem onClick={toggleNotifications}>
          <span className="menu-item-label">Notificações</span> 
        </MenuItem>
        <MenuItem to="/profile">
          <span className="menu-item-label">Perfil</span>
        </MenuItem>
      </Menu>

      
      {isNotificationsOpen && <Notifications />}
    </Navbar>
  );
};

export default NavBar;

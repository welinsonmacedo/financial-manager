import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faChartBar } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  text-align: center;
  max-width: 400px;
  min-width: 250px;
  min-height: 50px;
  max-height: 250px;
  padding: 15px;
  border: 2px solid #d4d4cb;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  margin-top: 10px;
`;

const Option = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Icon = styled.span`
  font-size: 1.2em;
  margin-right: 10px;
`;

const ExpenseComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <Title onClick={toggleDropdown}>
      <Icon><FontAwesomeIcon icon={faChartBar} color='red' /></Icon>
          Maiores Gastos do Mês
       
        {isOpen ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
      </Title>
      <DropdownContent isOpen={isOpen}>
        <Option>
         <p>oii</p>
        </Option>
      </DropdownContent>
    </Container>
  );
};

export default ExpenseComponent;

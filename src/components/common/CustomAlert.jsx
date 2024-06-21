import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => (props.type === 'success' ? '#28a745' : '#dc3545')};
  color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 9999;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
`;

const CustomAlert = ({ type, message, showAlert, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(showAlert);
  }, [showAlert]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return isOpen ? (
    <AlertContainer type={type}>
      <CloseButton onClick={handleClose}>X</CloseButton>
      {message}
    </AlertContainer>
  ) : null;
};

export default CustomAlert;

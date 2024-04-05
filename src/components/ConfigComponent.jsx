import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfigComponent = ({ onSave }) => {
  const [config, setConfig] = useState({
    apiKey: '',
    apiUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(config);
  };

  return (
    <Container>
      <Title>Configurações</Title>
      <div>
        <Label htmlFor="apiKey">Chave da API:</Label>
        <Input
          type="text"
          id="apiKey"
          name="apiKey"
          value={config.apiKey}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="apiUrl">URL da API:</Label>
        <Input
          type="text"
          id="apiUrl"
          name="apiUrl"
          value={config.apiUrl}
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleSave}>Salvar Configurações</Button>
    </Container>
  );
};

export default ConfigComponent;

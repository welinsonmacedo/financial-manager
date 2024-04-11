import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';

const UpdatePlanContainer = styled.div`
 padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-top: 150px;
  border: 1px solid gray;
`;

const PlanTitle = styled.h2`
  color: #333;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const PlanForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

`;

const Label = styled.label`
  color: #666;
  font-size: 1.2em;
  margin-bottom: 5px;
  margin-right: 10px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background-color: #30b94e;
  color: #ffffff;
  font-weight: 700;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #15241c;
  }
`;

const UpdatePlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic');

  const handleChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica para atualizar o plano do usuário com o plano selecionado
    console.log(`Plano selecionado: ${selectedPlan}`);
  };

  return (
    <>
    <NavBar/>
     <UpdatePlanContainer>
      <PlanTitle>Atualizar Plano</PlanTitle>
      <PlanForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="plan">Selecione o novo plano:</Label>
          <Select id="plan" value={selectedPlan} onChange={handleChange}>
            <option value="basic">Básico R$ 9,99</option>
            <option value="premium">Premium R$ 19,99</option>
            <option value="enterprise">Super R$ 29,99</option>
          </Select>
        </FormGroup>
        <Button type="submit">Atualizar</Button>
      </PlanForm>
    </UpdatePlanContainer>
    </>
   
  );
};

export default UpdatePlan;

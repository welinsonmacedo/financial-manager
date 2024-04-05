import React, { useState } from 'react';
import styled from 'styled-components';
import LaunchList from './LaunchList';
import BalanceSummary from './BalanceSummary';
import NavBar from './NavBar';


const Container = styled.div`
 display: flex;
 justify-content:space-evenly;
 padding-top:5rem;
 @media (max-width: 900px) {
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   
}
`;

const FormContainer = styled.div`

  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  @media (max-width: 900px) {
  max-width: 280px;
  width: 100%;
   
}
`;

const Form = styled.form`
  display: grid;
  grid-gap: 10px;
  width:400px; 
  @media (max-width: 900px) {
  max-width: 280px;
  width: 100%;
   
}
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1em;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  @media (max-width: 900px) {
    
  }
`;
const SectionTitle = styled.p`
  margin-top: 20px;
  font-size: 1.5em;
`;
const LaunchForm = ({ onAddLaunch }) => {
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Verifica se todos os campos foram preenchidos
        if (type && category && amount && date) {
            // Cria um novo objeto de lançamento
            const newLaunch = { type, category, amount, date };
            // Chama a função de callback passada como propriedade para adicionar o novo lançamento
            onAddLaunch(newLaunch);
            // Limpa os campos do formulário após o envio
            setType('');
            setCategory('');
            setAmount('');
            setDate('');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };
    const launches = ['welinson']
    return (
        <>
            <NavBar />
            <Container>

                <FormContainer>
                    <SectionTitle>Lançar Novo</SectionTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label>Tipo de Despesa:</Label>
                            <Select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Selecione o tipo de despesa</option>
                                <option value="Despesa">Despesa</option>
                                <option value="Receita">Receita</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Categoria:</Label>
                            <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Selecione a categoria</option>
                                <option value="Alimentação">Alimentação</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Moradia">Moradia</option>
                                <option value="Educação">Educação</option>
                                {/* Adicione mais opções de categoria conforme necessário */}
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Valor:</Label>
                            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Data:</Label>
                            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </FormGroup>
                        <Button type="submit">Adicionar Lançamento</Button>
                    </Form>
                </FormContainer>
                <LaunchList launches={launches} />
                <BalanceSummary balance={1000.00} />
            </Container>

        </>
    );
};
export default LaunchForm;

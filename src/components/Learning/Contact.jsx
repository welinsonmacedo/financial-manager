import React, { useState } from 'react';
import styled from 'styled-components';

const ContactContainer = styled.div`
  background-color: #f9f9f9;
  padding: 50px;
`;

const ContactTitle = styled.h2`
  font-size: 2em;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 1.1em;
  color: #555;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormTextarea = styled.textarea`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const FormButton = styled.button`
  background-color: #17b912;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #6bf1ae; 
    color: #000;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log(formData);
  };

  return (
    <ContactContainer>
      <ContactTitle>Entre em Contato</ContactTitle>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="name">Nome:</FormLabel>
            <FormInput
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="email">Email:</FormLabel>
            <FormInput
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor="message">Mensagem:</FormLabel>
            <FormTextarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
            ></FormTextarea>
          </FormGroup>
          <FormGroup>
            <FormButton type="submit">Enviar Mensagem</FormButton>
          </FormGroup>
        </Form>
      </FormContainer>
    </ContactContainer>
  );
};

export default Contact;

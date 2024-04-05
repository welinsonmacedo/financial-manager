import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from "../../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const CreateAnAccountContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-top: 50px;
  margin-top: 50px;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
`;

const Title = styled.h5`
  font-size: 1em;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: grid;
  grid-gap: 10px;
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

const Checkbox = styled.input`
  margin-right: 5px;
`;

const TermsLabel = styled.label`
  font-size: 0.9em;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
`;

const SocialLoginContainer = styled.div`
  margin-top: 20px;
`;

const SocialLoginText = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
`;

const SocialLoginButton = styled.button`
  background-color: ${({ color }) => color};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-right: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

const TermsOfUse = styled.p`
  font-size: 0.8em;
  color: #555;
`;

const CreateAnAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message);
    }
  };

  const handleGoogleSignUp = () => {
    const provider = new GoogleAuthProvider();
    handleSocialSignUp(provider);
  };

  const handleSocialSignUp = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
      alert('Cadastro realizado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar: ' + error.message);
    }
  };

  return (
    <CreateAnAccountContainer>
      <Logo src="GERENTEFINANCEIRO.png" alt="Logo" />
      <Title>Crie sua conta como quiser</Title>
      <Form onSubmit={handleSignUp}>
        <FormGroup>
          <Label>Seu email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Sua senha:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <TermsLabel>
          <Checkbox type="checkbox" required />
          Li e concordo com os <a href="/termsofuse">termos de uso</a>
        </TermsLabel>
        <Button type="submit">Começar a usar</Button>
      </Form>
      <SocialLoginContainer>
        <SocialLoginText>Ou crie uma conta usando uma rede social:</SocialLoginText>
        <SocialLoginButton color="#db4437" onClick={handleGoogleSignUp}>
          <FontAwesomeIcon icon={faGoogle} /> Criar uma conta usando o Google
        </SocialLoginButton>
      </SocialLoginContainer>
      <p>Já sou cadastrado. Quero fazer  <a href="/login">login!</a></p>
      <TermsOfUse>
        Ao se cadastrar, você concorda com nossos termos de uso. Leia-os atentamente.
      </TermsOfUse>
    </CreateAnAccountContainer>
  );
};

export default CreateAnAccount;

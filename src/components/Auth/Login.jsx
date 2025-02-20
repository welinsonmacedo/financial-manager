import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { auth } from "../../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import CustomAlert from '../common/CustomAlert'; 

const Container = styled.div`
  padding-top: 50px;
`;

const LoginContainer = styled.div`
  max-width: 400px;
  background-color: #fff;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-top: 30px;
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
  padding-top: 2rem;
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

const ForgotPassword = styled.p`
  font-size: 0.8em;
  color: #555;
  text-align: right;
`;
const Text = styled.p`
  font-size: 0.8em;
 
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAlertType('success');
        setAlertMessage('Login realizado com sucesso. Seja bem-vindo!');
        setTimeout(() => {
          navigate('/home');
        }, 3000); 
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Erro ao fazer login:Senha ou email invalidos !');
      setShowAlert(true);
    }
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    handleSocialLogin(provider);
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Erro ao fazer login: ' + error.message);
      setShowAlert(true);
    }
  };
  const handleCloseAlert = () => {
    setShowAlert(false); 
  };
  return (
    <>
      <NavBar/>
      <Container>
      {showAlert && (
              <CustomAlert
                type={alertType}
                message={alertMessage}
                showAlert={showAlert}
                onClose={handleCloseAlert}
              />)}
        <LoginContainer>
          <Logo src="GERENTEFINANCEIRO.png" alt="Logo" />
          <Title>Entre com sua conta</Title>
  
          <Form onSubmit={handleLogin}>
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
            
            <Button type="submit">Entrar</Button>
          </Form>
          <ForgotPassword>
            <a href="/forgotpassword">Esqueceu sua senha?</a>
          </ForgotPassword>
          <SocialLoginContainer>
            <SocialLoginText>Ou entre usando uma rede social:</SocialLoginText>
            <SocialLoginButton color="#db4437" onClick={handleGoogleLogin}>
              <FontAwesomeIcon icon={faGoogle} /> Entrar com o Google
            </SocialLoginButton>
          </SocialLoginContainer>
          <Text>Ainda não tem uma conta? <a href="/createaccount">Crie uma agora!</a></Text>
        </LoginContainer>
      </Container>
    </>
  );
};

export default Login;

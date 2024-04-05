import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Learning from '../pages/learning'
import CreateAnAccount from '../components/Auth/CreateAnAccount';
import Login from '../components/Auth/Login';
import Home from '../pages/home';

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Learning/>} />
        <Route exact path="/createaccount" element={<CreateAnAccount/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
        
       
      </Routes>
    </Router>
  );
};

export default RoutesApp;

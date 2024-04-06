import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Learning from '../pages/learning'
import CreateAnAccount from '../components/Auth/CreateAnAccount';
import Login from '../components/Auth/Login';
import Home from '../pages/home';
import LaunchesComponent from '../components/LaunchesComponent';
import ConfigComponent from '../components/ConfigComponent';
import CreateCategory from '../components/CreateCategory';


const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Learning/>} />
        <Route exact path="/createaccount" element={<CreateAnAccount/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/launches" element={<LaunchesComponent/>} />
        <Route exact path="/config" element={<ConfigComponent/>} />
        <Route exact path="/categoryexpense" element={<CreateCategory type="expense" /> } />
        <Route exact path="/categoryincome" element={<CreateCategory type="income" />} />
       
      </Routes>
    </Router>
  );
};

export default RoutesApp;

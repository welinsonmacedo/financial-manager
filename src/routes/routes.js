import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Learning from '../pages/learning'
import CreateAnAccount from '../components/Auth/CreateAnAccount';
import Login from '../components/Auth/Login';
import Home from '../pages/home';
import LaunchesComponent from '../components/LaunchesComponent';
import ConfigComponent from '../components/ConfigComponent';
import CreateCategory from '../components/CreateCategory';
import TermsOfUse from '../components/PrivacyAndAccessibility/TermsOfUse';
import ReportComponent from '../components/ReportComponent';
import Profile from '../components/Profile';
import Notifications from '../components/Notifications';
import MyPlan from './../components/MyPlan';
import UpdatePlan from '../components/UpdatePlan';


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
        <Route exact path="/termsofuse" element={<TermsOfUse/>} />
        <Route exact path="/reports" element={<ReportComponent/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/notifications" element={<Notifications/>} />
        <Route exact path="/myplan" element={<MyPlan/>} />
        <Route exact path="/updateplan" element={<UpdatePlan/>} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;

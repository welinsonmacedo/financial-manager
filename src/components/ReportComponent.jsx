import React from 'react';
import BalanceSummary from './BalanceSummary';
import ReportLaunchList from './ReportLaunchList';
import ReportsChart from './ReportsChart';
import PayableComponent from './PayableComponent';
import PaidComponent from './PaidComponent';
import NavBar from './NavBar';



const ReportComponent = () => {


    return (
        <>
        <NavBar/>
            <BalanceSummary />
            <ReportLaunchList />
            <PayableComponent/>
            <PaidComponent/>
           
        </>

    );
};

export default ReportComponent;

import React from "react";
import Logout from "../components/Auth/Logout";
import NavBar from "../components/NavBar";
import MainDashboard from "../components/DashboardMain";
import BalanceComponent from "../components/BalanceComponent";
import BillsComponent from "../components/BillsComponent";
import styled from "styled-components";
import PayableComponent from "../components/PayableComponent";
import ReceivableComponent from "../components/ReceivableComponent";
import ExpenseComponent from "../components/ExpenseComponent";

const SectionBalanceAndBills = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
flex-wrap: wrap;
padding: 20px;
gap: 1rem;

`
const Home = () => {

    return (
        <>
            <NavBar />
            <MainDashboard />
            
                <BalanceComponent />
               
           
            <SectionBalanceAndBills>
            <PayableComponent />
            <ReceivableComponent />
            <ExpenseComponent />
            </SectionBalanceAndBills>
            
            <Logout />
        </>
    )
}
export default Home
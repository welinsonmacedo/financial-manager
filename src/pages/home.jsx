import React from "react";
import Logout from "../components/Auth/Logout";
import NavBar from "../components/NavBar";
import MainDashboard from "../components/DashboardMain";
import BalanceComponent from "../components/BalanceComponent";


const Home = () => {

    return (
        <>
            <NavBar />
            <MainDashboard />
            
                <BalanceComponent />
               
           
         
            
         
        </>
    )
}
export default Home
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
               
                <p style={{textAlign:'center',marginTop:20}}>Desenvolvido por WelinsonMacedo </p>
         
            
         
        </>
    )
}
export default Home
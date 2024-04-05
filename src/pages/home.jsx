import React from "react";
import Logout from "../components/Auth/Logout";
import NavBar from "../components/NavBar";
import MainDashboard from "../components/DashboardMain";

const Home =()=>{

    return(
        <>
        <NavBar/>
        <MainDashboard/>
        <Logout/>
        </>
    )
}
export default Home
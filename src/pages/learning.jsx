import React from "react";
import NavBar from "../components/Learning/NavBar";
import BannerHome from "../components/Learning/BannerHome";
import Guide from "../components/Learning/Guide";
import Features from "../components/Learning/Features";
import Footer from "../components/Learning/Footer";
import About from "../components/Learning/About";
import Pricing from "../components/Learning/Pricing";
import Contact from "../components/Learning/Contact";

const learningPage = ()=>{
    return(
        <>
        <NavBar/>
        <BannerHome id="home"/>
        <Guide/>
        <Features />
        <About />
        <Pricing />
        <Contact/>
        <Footer/>
        </>
    )
}
export default learningPage
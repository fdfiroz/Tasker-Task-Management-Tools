import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
} from "@material-tailwind/react";
import HeroSection from "../components/Home/HeroSection";
import FeaturesSection from "../components/Home/FeaturesSection";


const Home = () => {
  return (
    <>
    <HeroSection></HeroSection>
    <FeaturesSection></FeaturesSection>
        
    </>
  )
}

export default Home
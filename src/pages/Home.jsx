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
import Newsletter from "../components/Home/Newsletter";
import Stats from "../components/Home/Stats";


const Home = () => {
  return (
    <>
    <HeroSection/>
    <FeaturesSection/>
    <Stats/>
    <Newsletter/>
    </>
  )
}

export default Home
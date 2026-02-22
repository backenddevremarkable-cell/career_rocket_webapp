import Link from "next/link";
import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Stats from "../components/home/Stats";
import Services from "../components/home/Service";
import Assessment from "../components/home/Assessment";
import CareerCounselors from "../components/home/CareerCounselors";
import Courses from "../components/home/Courses";
import CareerGroth from "../components/home/CareerGrowth";
import Moments from "../components/home/Moments";
import SuccessStories from "../components/home/SuccessStories";
import Universityes from "../components/home/Universities";
import Pricing from "../components/home/Pricing";
import Footer from "../components/Footer";
import Untitled from "../assets/images/Untitled.png";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Stats/>
      <Services/>
      <Assessment/>
      <CareerCounselors/>
      <Courses/>
      <CareerGroth/>
      <Moments/>
      <SuccessStories/>
      <Universityes/>
      <Pricing/>
      <Footer/>
      {/* <Image src={Untitled}/> */}
    </>
  );
}

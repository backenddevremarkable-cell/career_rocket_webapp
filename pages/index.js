import Link from "next/link";
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
import Untitled from "../assets/images/Untitled.png";
import Image from "next/image";
import { customEncrypt } from "../utils/cryptoHelper";
import AppPromo from "../components/home/AppPromo";
 
export default function Home() {

    //  const runEncryption = async (e) => {
    //   const encrypted = await customEncrypt(e);
    //   console.log("Encrypted:", encrypted);
    // };

   return (
    <>
      <Hero />
      <About />
      <Stats/>
      <Services/>
      <Assessment/>
      <CareerCounselors/>
      <CareerGroth/>
      <Courses/>
      <Moments/>
      <SuccessStories/>
      <Universityes/>
      <AppPromo/>
      {/* <Image src={Untitled}/> */}
    </>
  );
}

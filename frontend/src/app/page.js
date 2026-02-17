import CompatibilityBanner from "@/components/CompatibilityBanner";
import Destinations from "@/components/Destinations";
import TrustedBy from "@/components/TrustedBy";
import Image from "next/image";
import Hero from "../components/Hero"
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import HomeSearchButton from "@/components/HomeSearchButton";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Destinations/>
      <CompatibilityBanner/>
      <HowItWorks/>
      <Testimonials/>
      <TrustedBy/>
      <HomeSearchButton/>
    </div>
  );
}

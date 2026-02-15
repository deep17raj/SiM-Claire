import CompatibilityBanner from "@/components/CompatibilityBanner";
import Destinations from "@/components/Destinations";
import TrustedBy from "@/components/TrustedBy";
import Image from "next/image";
import Hero from "../components/Hero"
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Destinations/>
      <TrustedBy/>
      <CompatibilityBanner/>
      <HowItWorks/>
      <Testimonials/>
    </div>
  );
}

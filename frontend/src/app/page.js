import CompatibilityBanner from "@/components/CompatibilityBanner";
import Destinations from "@/components/Destinations";
import TrustedBy from "@/components/TrustedBy";
import Image from "next/image";
import Hero from "../components/Hero"

export default function Home() {
  return (
    <div>
      <Hero/>
      <Destinations/>
      <TrustedBy/>
      <CompatibilityBanner/>
    </div>
  );
}

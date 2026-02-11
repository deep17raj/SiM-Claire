import CompatibilityBanner from "@/components/CompatibilityBanner";
import Destinations from "@/components/Destinations";
import TrustedBy from "@/components/TrustedBy";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Destinations/>
      <TrustedBy/>
      <CompatibilityBanner/>
    </div>
  );
}

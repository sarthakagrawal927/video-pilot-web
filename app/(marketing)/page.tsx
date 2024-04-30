import { PricingCards } from "@/components/pricing-cards";
import { BentoGrid } from "@/components/sections/bentogrid";
import { Features } from "@/components/sections/features";
import { HeroLanding } from "@/components/sections/hero-landing";
import { InfoLanding } from "@/components/sections/info-landing";
import { Powered } from "@/components/sections/powered";
import { PreviewLanding } from "@/components/sections/preview-landing";
import { infos } from "@/config/landing";

export default async function IndexPage() {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      {/* <Powered /> */}
      {/* <BentoGrid /> */}
      <InfoLanding data={infos[0]} reverse={true} />
      <InfoLanding data={infos[1]} />
      <Features />
      <div className="py-40"><PricingCards /></div>
      {/* <Testimonials /> */}
    </>
  );
}

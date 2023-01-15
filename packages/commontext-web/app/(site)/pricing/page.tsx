import PricingItem from "../../../components/PricingItem/PricingItem";
import SiteFooter from "../../../components/SiteFooter/SiteFooter";
import SiteHeader from "../../../components/SiteHeader/SiteHeader";

import styles from "./page.module.scss";

import { IBM_Plex_Mono } from "@next/font/google";
import PricingInfo from "../../../components/PricingInfo/PricingInfo";
import IntroHero from "../../../components/IntroHero/IntroHero";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function Pricing() {
  return (
    <>
      <SiteHeader />
      <main className={ibmPlexMono.className}>
        <IntroHero headline="Simple Pricing" subHeadline="Two Options" />
        <PricingInfo />
      </main>
      <SiteFooter />
    </>
  );
}

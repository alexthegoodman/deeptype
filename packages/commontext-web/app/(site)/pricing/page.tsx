import PricingItem from "../../../components/PricingItem/PricingItem";
import SiteFooter from "../../../components/SiteFooter/SiteFooter";
import SiteHeader from "../../../components/SiteHeader/SiteHeader";

import styles from "./page.module.scss";

import { IBM_Plex_Mono } from "@next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function Pricing() {
  return (
    <>
      <SiteHeader />
      <main className={ibmPlexMono.className}>
        <section className={styles.introHero}>
          <div className={styles.introHeroInner}>
            <h1>Simple Pricing</h1>
            <h2>Two Options</h2>
          </div>
        </section>
        <section className={styles.pricingInfo}>
          <div className={styles.pricingInfoInner}>
            <div className={styles.left}>
              <PricingItem price={19} frequency="Monthly" />
            </div>
            <div className={styles.right}>
              <PricingItem price={12} frequency="Annually" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

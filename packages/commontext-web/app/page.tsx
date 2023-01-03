import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

import styles from "./page.module.scss";
import LogOutLink from "../components/LogOutLink/LogOutLink";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import { IBM_Plex_Mono } from "@next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Home() {
  const nextCookies = cookies();
  const coUserToken = nextCookies.get("coUserToken");

  return (
    <>
      <SiteHeader />
      <main>
        <section className={styles.siteHero}>
          <div className={styles.siteHeroInner}>
            <h1 className={ibmPlexMono.className}>
              Surface <span>relevant information</span> as you type
            </h1>
            <div className={styles.heroVideo}>
              <video />
            </div>
          </div>
          <div className={styles.featureWrapper}>
            <div className={styles.siteHeroInner}>
              <div className={styles.heroFeatures}>
                <div className={styles.feature}>
                  <i className="ph-flow-arrow-thin"></i>
                  <span>Improve your flow</span>
                  <p>
                    Never run out of new ideas for what to write next as
                    AI-powered information assists you.
                  </p>
                </div>
                <div className={styles.feature}>
                  <i className="ph-article-thin"></i>
                  <span>Enrich your content</span>
                  <p>
                    Include important facts and details that otherwise would
                    have been lost.
                  </p>
                </div>
                <div className={styles.feature}>
                  <i className="ph-scales-thin"></i>
                  <span>Remain compliant</span>
                  <p>
                    Avoid Google's spam detection algorithms by writing content
                    from scratch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

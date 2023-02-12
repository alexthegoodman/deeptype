import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";

import styles from "./page.module.scss";
import LogOutLink from "../components/LogOutLink/LogOutLink";
import SiteHeader from "../components/SiteHeader/SiteHeader";
import SiteFooter from "../components/SiteFooter/SiteFooter";
import { IBM_Plex_Mono } from "@next/font/google";
import FeatureSection from "../components/FeatureSection/FeatureSection";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className={ibmPlexMono.className}>
        <section className={styles.siteHero}>
          <div className={styles.siteHeroInner}>
            <h1 className={ibmPlexMono.className}>
              Write and Research <br />
              <span>Well-Informed</span> Books
            </h1>
            <div className={styles.heroVideo}>
              <iframe
                // width="560"
                // height="315"
                src="https://www.youtube.com/embed/7j7cjM1O1TQ?controls=0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
        <FeatureSection
          videoSrc=""
          headline={
            <>
              Surface <span>relevant information</span> as you type
            </>
          }
          features={[
            {
              title: "Enrich your content",
              copy: `Include important facts and details that otherwise would
            have been lost.`,
            },
            {
              title: "Improve your flow",
              copy: `Never run out of new ideas as
            AI-powered information assists you.`,
            },
          ]}
        />
        <FeatureSection
          videoSrc=""
          flip={true}
          headline={
            <>
              <span>Research inside</span> your text editor
            </>
          }
          features={[
            {
              title: "No algorithms",
              copy: `Search the web without algorithms determining what you find.`,
            },
            {
              title: "Save items for later",
              copy: `Keep all of your findings for later and access them while you're writing.`,
            },
          ]}
        />
        <FeatureSection
          videoSrc=""
          headline={
            <>
              Get <span>AI text suggestions</span> as you type
            </>
          }
          features={[
            {
              title: "Write rapidly",
              copy: `Use multiple text suggestion options to help prevent writer's block.`,
            },
            {
              title: "Gather inspiration",
              copy: `Use the text suggestions to help create creative, original content.`,
            },
          ]}
        />
      </main>
      <SiteFooter />
    </>
  );
}

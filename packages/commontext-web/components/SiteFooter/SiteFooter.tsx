import * as React from "react";

import styles from "./SiteFooter.module.scss";

import { SiteFooterProps } from "./SiteFooter.d";
import Link from "next/link";
import { IBM_Plex_Mono } from "@next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SiteFooter: React.FC<SiteFooterProps> = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterInner}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <Link href="/" className={ibmPlexMono.className}>
              CommonText
            </Link>
          </div>
          <span>&copy; Common 2023</span>
        </div>
        <div className={styles.right}>
          <nav className={styles.navigation}>
            <ul>
              {/* <li>
                <Link href="/how-it-works">How it Works</Link>
              </li> */}
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/sign-up">Try Now</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

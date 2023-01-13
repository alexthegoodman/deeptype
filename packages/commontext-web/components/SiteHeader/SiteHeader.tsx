import * as React from "react";

import { IBM_Plex_Mono } from "@next/font/google";
import styles from "./SiteHeader.module.scss";

import { SiteHeaderProps } from "./SiteHeader.d";
import Link from "next/link";
import { cookies } from "next/headers";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SiteHeader: React.FC<SiteHeaderProps> = () => {
  const nextCookies = cookies();
  const coUserToken = nextCookies.get("coUserToken");

  return (
    <header className={`${ibmPlexMono.className} ${styles.siteHeader}`}>
      <div className={styles.siteHeaderInner}>
        <div className={styles.left}>
          <div className={`${styles.brand}`}>
            <Link href="/">DeepType</Link>
          </div>
          <nav className={styles.navigation}>
            <ul>
              {/* <li>
                <Link href="/how-it-works">How it Works</Link>
              </li> */}
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.right}>
          {coUserToken ? (
            <Link href="/browse" className={styles.btn}>
              Go to App
            </Link>
          ) : (
            <Link href="/sign-in" className={styles.btn}>
              Try Beta
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;

"use client";

import * as React from "react";

import { IBM_Plex_Mono } from "@next/font/google";
import styles from "./SiteHeader.module.scss";

import { SiteHeaderProps } from "./SiteHeader.d";
import Link from "next/link";
import { useCookies } from "react-cookie";
// import { cookies } from "next/headers";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SiteHeader: React.FC<SiteHeaderProps> = () => {
  // const nextCookies = cookies();
  // const coUserToken = nextCookies.get("coUserToken");
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const [showMobile, setShowMobile] = React.useState(false);

  const closeMenus = () => {
    setShowMobile(false);
  };

  return (
    <header
      className={`${ibmPlexMono.className} ${styles.siteHeader}  ${
        showMobile ? styles.showMobile : styles.hideMobile
      }`}
    >
      <div className={styles.mobileButtonContainer}>
        <a href="#!" onClick={() => setShowMobile(!showMobile)}>
          <i className="ph-list"></i>
        </a>
      </div>
      <div className={styles.siteHeaderInner}>
        <div className={styles.left}>
          <div className={`${styles.brand}`}>
            <Link href="/">
              DeepType<span>Beta</span>
            </Link>
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
          {token ? (
            <Link href="/browse" className={styles.btn}>
              Go to App
            </Link>
          ) : (
            <Link href="/sign-up" className={styles.btn}>
              Try Now
            </Link>
          )}
        </div>
      </div>
      <div className={styles.mobileHeader}>
        <div className={styles.mobileHeaderInner}>
          <div className={styles.brandContainer}>
            <h1 className={styles.brand}>
              <Link href="/">
                DeepType<span>Beta</span>
              </Link>
            </h1>
          </div>
          <div className={styles.buttonContainer}>
            <a href="#!" onClick={() => setShowMobile(!showMobile)}>
              <i className="ph-list"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;

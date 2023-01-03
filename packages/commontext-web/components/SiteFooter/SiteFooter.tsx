import * as React from "react";

import styles from "./SiteFooter.module.scss";

import { SiteFooterProps } from "./SiteFooter.d";
import Link from "next/link";

const SiteFooter: React.FC<SiteFooterProps> = () => {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.siteFooterInner}>
        <div className={styles.left}>
          <div className={styles.brand}>
            <span>CommonText</span>
          </div>
        </div>
        <div className={styles.right}>
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link href="/how-it-works">How it Works</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/sign-in">Try Private Beta</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;

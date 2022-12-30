import * as React from "react";

import styles from "./HomeHeader.module.scss";

import { HomeHeaderProps } from "./HomeHeader.d";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const HomeHeader: React.FC<HomeHeaderProps> = () => {
  return (
    <header className={styles.homeHeader}>
      <div className={styles.homeHeaderInner}>
        <div className={styles.left}></div>
        <div className={styles.center}></div>
        <div className={styles.right}>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;

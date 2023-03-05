import * as React from "react";

import styles from "./Drawer.module.scss";

import { DrawerProps } from "./Drawer.d";

const Drawer: React.FC<DrawerProps> = ({ children = null }) => {
  return (
    <section className={styles.drawer}>
      <div className={styles.drawerInner}>{children}</div>
    </section>
  );
};

export default Drawer;

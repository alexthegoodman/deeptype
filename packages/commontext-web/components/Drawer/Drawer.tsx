import * as React from "react";

import styles from "./Drawer.module.scss";

import { DrawerProps } from "./Drawer.d";

const Drawer: React.FC<DrawerProps> = ({
  onCloseDrawer = () => console.info("close drawer"),
  children = null,
}) => {
  return (
    <section className={styles.drawer}>
      <div className={styles.drawerCtrls}>
        <button className={styles.close} onClick={onCloseDrawer}>
          <i className="ph-x"></i>
        </button>
      </div>
      <div className={styles.drawerInner}>{children}</div>
    </section>
  );
};

export default Drawer;

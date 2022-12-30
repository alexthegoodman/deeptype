import * as React from "react";

import styles from "./HomeSidebar.module.scss";

import { HomeSidebarProps } from "./HomeSidebar.d";
import Link from "next/link";

const HomeSidebar: React.FC<HomeSidebarProps> = () => {
  return (
    <aside className={styles.homeSidebar}>
      <div className={styles.homeSidebarInner}>
        <ul>
          <li>
            <Link href="/browse">Documents</Link>
          </li>
          <li>
            <Link href="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default HomeSidebar;

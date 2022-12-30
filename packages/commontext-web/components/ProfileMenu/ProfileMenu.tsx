import * as React from "react";

import styles from "./ProfileMenu.module.scss";

import { ProfileMenuProps } from "./ProfileMenu.d";
import Image from "next/image";
import Link from "next/link";

const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  return (
    <section className={styles.profileMenu}>
      <div className={styles.profileMenuInner}>
        <div className={styles.menuTrigger}>
          <span>Alex Goodman</span>
          <Image src="" alt="" />
        </div>
        {/* <div className={styles.dropdown}>
          <ul>
            <li><Link>Links</Link></li>
          </ul>
        </div> */}
      </div>
    </section>
  );
};

export default ProfileMenu;

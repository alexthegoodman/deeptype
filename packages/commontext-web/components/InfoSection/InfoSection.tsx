import * as React from "react";

import styles from "./InfoSection.module.scss";

import { InfoSectionProps } from "./InfoSection.d";

const InfoSection: React.FC<InfoSectionProps> = ({ children = null }) => {
  return (
    <section className={styles.infoSection}>
      <div className={styles.infoSectionInner}>{children}</div>
    </section>
  );
};

export default InfoSection;

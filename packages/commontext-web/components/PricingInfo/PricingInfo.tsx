import * as React from "react";

import styles from "./PricingInfo.module.scss";

import { PricingInfoProps } from "./PricingInfo.d";
import PricingItem from "../PricingItem/PricingItem";

const PricingInfo: React.FC<PricingInfoProps> = ({ leftBtn, rightBtn }) => {
  return (
    <section className={styles.pricingInfo}>
      <div className={styles.pricingInfoInner}>
        <div className={styles.left}>
          <PricingItem price={19} frequency="Monthly" btn={leftBtn} />
        </div>
        <div className={styles.right}>
          <PricingItem price={12} frequency="Annually" btn={rightBtn} />
        </div>
      </div>
    </section>
  );
};

export default PricingInfo;

import * as React from "react";

import styles from "./PricingInfo.module.scss";

import { PricingInfoProps } from "./PricingInfo.d";
import PricingItem from "../PricingItem/PricingItem";

const PricingInfo: React.FC<PricingInfoProps> = ({
  leftBtn,
  centerBtn,
  rightBtn,
}) => {
  return (
    <section className={styles.pricingInfo}>
      <div className={styles.pricingInfoInner}>
        <div className={styles.left}>
          <PricingItem
            price={"Free"}
            btn={leftBtn}
            items={[
              "Information as You Type",
              "Unlimited Documents",
              "Customer Support",
            ]}
          />
        </div>
        <div className={styles.center}>
          <PricingItem
            price={19}
            frequency="Monthly"
            btn={centerBtn}
            items={[
              "AI Text Suggestions",
              "Information as You Type",
              "Unlimited Documents",
              "Customer Support",
            ]}
          />
        </div>
        <div className={styles.right}>
          <PricingItem
            price={12}
            frequency="Annually"
            btn={rightBtn}
            items={[
              "AI Text Suggestions",
              "Information as You Type",
              "Unlimited Documents",
              "Customer Support",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default PricingInfo;

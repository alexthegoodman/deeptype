import * as React from "react";

import styles from "./PricingItem.module.scss";

import { PricingItemProps } from "./PricingItem.d";

const PricingItem: React.FC<PricingItemProps> = ({
  price = 0,
  frequency = "",
}) => {
  return (
    <section className={styles.pricingItem}>
      <div className={styles.pricingItemInner}>
        <h3>${price}/mo</h3>
        <h4>Paid {frequency}</h4>
        <ul>
          <li>
            <i className="ph-check-circle-thin"></i>
            <span>Unlimited Documents</span>
          </li>
          <li>
            <i className="ph-check-circle-thin"></i>
            <span>Unlimited Research</span>
          </li>
          <li>
            <i className="ph-check-circle-thin"></i>
            <span>Customer Support</span>
          </li>
        </ul>
        <a href="#!" className={styles.btn}>
          Start Now
        </a>
      </div>
    </section>
  );
};

export default PricingItem;

import * as React from "react";

import styles from "./PricingItem.module.scss";

import { PricingItemProps } from "./PricingItem.d";
import Link from "next/link";

const PricingItem: React.FC<PricingItemProps> = ({
  price = 0,
  frequency = "",
  btn = (
    <Link href="/sign-up/" className={styles.btn}>
      Start Now
    </Link>
  ),
  items = [],
}) => {
  return (
    <section className={styles.pricingItem}>
      <div className={styles.pricingItemInner}>
        <h3>{typeof price === "number" ? `$${price}/mo` : price}</h3>
        {frequency ? <h4>Paid {frequency}</h4> : <></>}
        <ul>
          {items.map((item) => {
            return (
              <li>
                <i className="ph-check-circle-thin"></i>
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
        {btn}
      </div>
    </section>
  );
};

export default PricingItem;

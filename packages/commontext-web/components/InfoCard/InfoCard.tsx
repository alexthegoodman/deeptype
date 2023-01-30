import * as React from "react";

import styles from "./InfoCard.module.scss";

import { InfoCardProps } from "./InfoCard.d";

const InfoCard: React.FC<InfoCardProps> = ({ item = null }) => {
  return (
    <div className={styles.resultItem}>
      <div className={styles.itemHeader}>
        <span>Summary</span>
      </div>
      <div className={styles.itemBody}>
        <p>{item.summary}</p>
      </div>
      <div className={styles.itemFooter}>
        <div className={styles.left}>
          {/* <a href="#!" target="_blank">
            <i className="ph-copy-thin"></i>
          </a> */}
          <a href={item.url} target="_blank">
            <i className="ph-arrow-square-out-thin"></i>
            <span>Source</span>
          </a>
        </div>
        <div className={styles.right}>
          {/* <ArrowCircleRight weight="thin" size={25} /> */}
        </div>
      </div>
    </div>
  );
};

export default InfoCard;

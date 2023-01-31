import * as React from "react";

import styles from "./BasicCard.module.scss";

import { BasicCardProps } from "./BasicCard.d";

const BasicCard: React.FC<BasicCardProps> = ({
  header = null,
  body = null,
  footerLeft = null,
  footerRight = null,
}) => {
  return (
    <div className={styles.resultItem}>
      <div className={styles.itemHeader}>{header}</div>
      <div className={styles.itemBody}>{body}</div>
      <div className={styles.itemFooter}>
        <div className={styles.left}>{footerLeft}</div>
        <div className={styles.right}>{footerRight}</div>
      </div>
    </div>
  );
};

export default BasicCard;

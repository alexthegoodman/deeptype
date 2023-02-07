import * as React from "react";

import styles from "./EmptyNotice.module.scss";

import { EmptyNoticeProps } from "./EmptyNotice.d";

const EmptyNotice: React.FC<EmptyNoticeProps> = ({
  icon = "ph-info-thin",
  message = "Nothing here yet!",
}) => {
  return (
    <section className={styles.emptyNotice}>
      <div className={styles.emptyNoticeInner}>
        <i className={icon}></i>
        <p>{message}</p>
      </div>
    </section>
  );
};

export default EmptyNotice;

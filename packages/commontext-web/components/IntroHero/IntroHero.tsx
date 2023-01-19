import * as React from "react";

import styles from "./IntroHero.module.scss";

import { IntroHeroProps } from "./IntroHero.d";

const IntroHero: React.FC<IntroHeroProps> = ({
  headline = "",
  subHeadline = "",
}) => {
  return (
    <section className={styles.introHero}>
      <div className={styles.introHeroInner}>
        <h1>{headline}</h1>
        <h2>{subHeadline}</h2>
      </div>
    </section>
  );
};

export default IntroHero;

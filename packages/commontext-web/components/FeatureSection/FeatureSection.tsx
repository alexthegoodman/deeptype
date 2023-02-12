import * as React from "react";

import styles from "./FeatureSection.module.scss";

import { FeatureSectionProps } from "./FeatureSection.d";

const FeatureSection: React.FC<FeatureSectionProps> = ({
  videoSrc = "",
  flip = false,
  headline = <></>,
  features = [],
}) => {
  return (
    <section
      className={`${styles.featureSection} ${flip ? styles.flipped : ""}`}
    >
      <div className={styles.featureSectionInner}>
        <div className={styles.video}>
          <video playsInline={true} loop={true} muted={true}>
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
        <div className={styles.copy}>
          <h2>{headline}</h2>
          <section className={styles.features}>
            {features.map((feature, i) => {
              return (
                <div className={styles.feature} key={i}>
                  <span>{feature.title}</span>
                  <p>{feature.copy}</p>
                </div>
              );
            })}
          </section>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

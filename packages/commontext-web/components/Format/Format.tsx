import * as React from "react";

import styles from "./Format.module.scss";

import { FormatProps } from "./Format.d";
import LivePreview from "../LivePreview/LivePreview";
import SelectPreset from "../SelectPreset/SelectPreset";

const Format: React.FC<FormatProps> = () => {
  return (
    <section className={styles.boxContainer}>
      {/* <SelectPreset /> */}

      <section className={styles.basicBox}>
        <div className={styles.basicBoxInner}>
          <span>Live Preview</span>
          <div></div>
        </div>
        <div className={styles.basicBoxInner}>
          <LivePreview />
        </div>
      </section>
    </section>
  );
};

export default Format;

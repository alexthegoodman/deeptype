import * as React from "react";

import styles from "./PresetGrid.module.scss";

import { PresetGridProps } from "./PresetGrid.d";

const PresetGrid: React.FC<PresetGridProps> = ({
  onSelectPreset = (preset) => console.info("onSelectPreset", preset),
}) => {
  return (
    <section className={styles.presetGrid}>
      <div className={styles.presetGridInner}>
        <h1>Available Formats</h1>
        <ul>
          <li onClick={() => onSelectPreset("cover")}>
            <i className="ph-file"></i>Cover
          </li>
          <li onClick={() => onSelectPreset("part")}>
            <i className="ph-file-minus"></i>Part
          </li>
          <li onClick={() => onSelectPreset("chapter")}>
            <i className="ph-file-text"></i>Chapter
          </li>
        </ul>
      </div>
    </section>
  );
};

export default PresetGrid;

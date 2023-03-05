import * as React from "react";

import styles from "./PresetGrid.module.scss";

import { PresetGridProps } from "./PresetGrid.d";

const PresetGrid: React.FC<PresetGridProps> = ({
  onSelectPreset = (preset) => console.info("onSelectPreset", preset),
}) => {
  return (
    <section>
      <div>
        <ul>
          <li onClick={() => onSelectPreset("cover")}>Cover</li>
          <li onClick={() => onSelectPreset("part")}>Part</li>
          <li onClick={() => onSelectPreset("chapter")}>Chapter</li>
        </ul>
      </div>
    </section>
  );
};

export default PresetGrid;

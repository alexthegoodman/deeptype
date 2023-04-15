import * as React from "react";

import styles from "./SelectPreset.module.scss";

import { SelectPresetProps } from "./SelectPreset.d";
import Drawer from "../Drawer/Drawer";
import PresetGrid from "../PresetGrid/PresetGrid";

const SelectPreset: React.FC<SelectPresetProps> = ({
  initialPreset = null,
}) => {
  const [openPresetDrawer, setOpenPresetDrawer] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState(initialPreset);

  const selectPresetHandler = (preset) => {
    setSelectedPreset(preset);
    setOpenPresetDrawer(false);
  };

  return (
    <section className={styles.basicBox} style={{ minHeight: 50 }}>
      <div className={styles.basicBoxInner}>
        <span>Document Format</span>
        <button
          className={styles.btn}
          style={{ height: 35 }}
          onClick={() => setOpenPresetDrawer(true)}
        >
          {selectedPreset ? selectedPreset : "Select Preset"}
        </button>
        {openPresetDrawer ? (
          <Drawer onCloseDrawer={() => setOpenPresetDrawer(false)}>
            <PresetGrid onSelectPreset={selectPresetHandler} />
          </Drawer>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default SelectPreset;

import * as React from "react";

import styles from "./Format.module.scss";

import { FormatProps } from "./Format.d";
import Dropdown from "../Dropdown/Dropdown";
import Drawer from "../Drawer/Drawer";
import PresetGrid from "../PresetGrid/PresetGrid";
import LivePreview from "../LivePreview/LivePreview";

const Format: React.FC<FormatProps> = () => {
  const [openPresetDrawer, setOpenPresetDrawer] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState(null);

  const selectPresetHandler = (preset) => {
    setSelectedPreset(preset);
    setOpenPresetDrawer(false);
  };

  return (
    <section className={styles.boxContainer}>
      <section className={styles.basicBox}>
        <div className={styles.basicBoxInner}>
          <span>Select Preset</span>
          <button
            className={styles.btn}
            onClick={() => setOpenPresetDrawer(true)}
          >
            {selectedPreset ? selectedPreset : "Open Preset Drawer"}
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

import * as React from "react";

import styles from "./Format.module.scss";

import { FormatProps } from "./Format.d";
import Dropdown from "../Dropdown/Dropdown";
import Drawer from "../Drawer/Drawer";
import PresetGrid from "../PresetGrid/PresetGrid";

const Format: React.FC<FormatProps> = () => {
  const [openPresetDrawer, setOpenPresetDrawer] = React.useState(false);
  const [selectedPreset, setSelectedPreset] = React.useState(null);

  const selectPresetHandler = (preset) => {
    setSelectedPreset(preset);
    setOpenPresetDrawer(false);
  };

  return (
    <>
      <section>
        <div>
          <span>Preset</span>
          <button onClick={() => setOpenPresetDrawer(true)}>
            {selectedPreset ? selectedPreset : "Select Preset"}
          </button>
          {openPresetDrawer ? (
            <Drawer>
              <PresetGrid onSelectPreset={selectPresetHandler} />
            </Drawer>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
};

export default Format;

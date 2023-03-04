import * as React from "react";

import styles from "./Format.module.scss";

import { FormatProps } from "./Format.d";
import Dropdown from "../Dropdown/Dropdown";

const Format: React.FC<FormatProps> = () => {
  return (
    <>
      <section>
        <div>
          <span>Preset</span>
          <Dropdown options={["Preset 1", "Preset 2"]} />
        </div>
      </section>
    </>
  );
};

export default Format;

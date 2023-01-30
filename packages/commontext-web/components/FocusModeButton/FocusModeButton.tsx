import * as React from "react";

import styles from "./FocusModeButton.module.scss";

import { FocusModeButtonProps } from "./FocusModeButton.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";

const FocusModeButton: React.FC<FocusModeButtonProps> = () => {
  const [{ focusModeEnabled }, dispatch] = useEditorContext();

  const toggleFocusMode = () => {
    dispatch({ type: "focusModeEnabled", payload: !focusModeEnabled });
  };

  const label = focusModeEnabled ? "Full Mode" : "Focus Mode";

  return (
    <button className={styles.focusModeButton} onClick={toggleFocusMode}>
      <i className="ph-crosshair"></i>
      <span>{label}</span>
    </button>
  );
};

export default FocusModeButton;

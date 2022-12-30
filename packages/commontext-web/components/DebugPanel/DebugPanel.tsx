import * as React from "react";

import styles from "./DebugPanel.module.scss";

import { DebugPanelProps } from "./DebugPanel.d";

const DebugPanel: React.FC<DebugPanelProps> = ({ resultData = null }) => {
  return (
    <div className={styles.debugPanel}>
      {/* <div>Debounced Plaintext: {JSON.stringify(debouncedPlaintext)}</div> */}
      <div>
        Keywords: {JSON.stringify(resultData?.contextKeywords)}{" "}
        {JSON.stringify(resultData?.keywords)}
      </div>
      {/* <div>Results: {JSON.stringify(resultData.results)}</div> */}
    </div>
  );
};

export default DebugPanel;

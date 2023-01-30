import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import styles from "./EditorGroup.module.scss";

import { EditorGroupProps } from "./EditorGroup.d";
import { useWindowSize } from "../../hooks/useWindowSize";
import EditorField from "../EditorField/EditorField";
import Information from "../Information/Information";
import { useEditorContext } from "../../context/EditorContext/EditorContext";

function ResizeHandle({
  className = "",
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <PanelResizeHandle className={styles.resizeHandle} id={id}>
      <div className={styles.resizeHandleInner}>
        <i className="ph-dots-six-vertical"></i>
        <i className="ph-dots-six-vertical"></i>
        {/* <i className="ph-dots-six-vertical"></i> */}
      </div>
    </PanelResizeHandle>
  );
}

const EditorGroup: React.FC<EditorGroupProps> = ({
  documentId = "",
  documentData = null,
}) => {
  const [{ focusModeEnabled }, dispatch] = useEditorContext();
  const windowSize = useWindowSize();

  return (
    <section
      className={`${styles.editorGroupWrapper} ${
        focusModeEnabled ? styles.focusMode : ""
      }`}
    >
      <PanelGroup
        autoSaveId="primary"
        direction={
          typeof windowSize.width !== "undefined" && windowSize.width < 900
            ? "vertical"
            : "horizontal"
        }
        className={styles.editorGroup}
      >
        <Panel className={styles.panel} defaultSize={60} order={1}>
          <EditorField documentId={documentId} documentData={documentData} />
        </Panel>
        {!focusModeEnabled ? (
          <>
            <ResizeHandle />
            <Panel className={styles.panel} order={2}>
              <Information />
            </Panel>
          </>
        ) : (
          <></>
        )}
      </PanelGroup>
    </section>
  );
};

export default EditorGroup;

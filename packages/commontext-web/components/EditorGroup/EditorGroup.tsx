import * as React from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import styles from "./EditorGroup.module.scss";

import { EditorGroupProps } from "./EditorGroup.d";
import { useWindowSize } from "../../hooks/useWindowSize";
import EditorField from "../EditorField/EditorField";
import Information from "../Information/Information";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import Suggestions from "../Suggestions/Suggestions";
import Sidebars from "../Sidebars/Sidebars";

function ResizeHandle({
  className = "",
  id,
  style,
}: {
  className?: string;
  id?: string;
  style?: any;
}) {
  return (
    <PanelResizeHandle className={styles.resizeHandle} id={id} style={style}>
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
  refetchDocument = () => console.info("refetch"),
}) => {
  const [{ focusModeEnabled }, dispatch] = useEditorContext();
  const windowSize = useWindowSize();

  const backgroundColor = "rgba(217, 217, 217, 0.2)";

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
          <EditorField
            documentId={documentId}
            documentData={documentData}
            refetch={refetchDocument}
          />
        </Panel>
        {!focusModeEnabled ? (
          <>
            <ResizeHandle style={{ backgroundColor }} />
            <Panel
              style={{ backgroundColor }}
              className={styles.panel}
              order={2}
            >
              <Sidebars documentId={documentId} documentData={documentData} />
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

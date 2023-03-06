import * as React from "react";

import styles from "./LivePreview.module.scss";

import { LivePreviewProps } from "./LivePreview.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import PreviewChapter from "../PreviewChapter/PreviewChapter";

const LivePreview: React.FC<LivePreviewProps> = () => {
  const [{ editorTitle, editorJson, editorValue }, dispatch] =
    useEditorContext();

  console.info("LivePreview", editorJson, editorValue);

  // TODO: capture HTML contents from livePreviewInner

  return (
    <section className={styles.livePreview}>
      <div className={styles.livePreviewInner}>
        <PreviewChapter title={editorTitle} />
        <section dangerouslySetInnerHTML={{ __html: editorValue }}></section>
      </div>
    </section>
  );
};

export default LivePreview;

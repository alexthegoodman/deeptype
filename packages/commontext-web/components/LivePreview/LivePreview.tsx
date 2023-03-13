import * as React from "react";

import styles from "./LivePreview.module.scss";

import { LivePreviewProps } from "./LivePreview.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import PreviewChapter from "../PreviewChapter/PreviewChapter";
import graphClient from "../../helpers/GQLClient";
import { useCookies } from "react-cookie";
import { exportMutation } from "../../graphql/export";

const LivePreview: React.FC<LivePreviewProps> = () => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const [{ editorTitle, editorJson, editorValue }, dispatch] =
    useEditorContext();

  console.info("LivePreview", editorJson, editorValue);

  // TODO: capture HTML contents from livePreviewContents
  const extractHTML = () => {
    const html = document.getElementById("livePreviewContents")?.innerHTML;
    console.info("extractHTML", html);
    return html;
  };

  const handleExportPDF = async () => {
    const html = extractHTML();

    await graphClient.client?.request(exportMutation, {
      type: "pdf",
      html: JSON.stringify(html),
    });
  };

  const handleExportEpub = async () => {
    const html = extractHTML();

    await graphClient.client?.request(exportMutation, {
      type: "epub",
      html: JSON.stringify(html),
    });
  };

  return (
    <section className={styles.livePreview}>
      <div className={styles.livePreviewInner}>
        <section
          id="livePreviewContents"
          className={styles.livePreviewContents}
        >
          <PreviewChapter title={editorTitle} />
          <section dangerouslySetInnerHTML={{ __html: editorValue }}></section>
          <style>
            {`.ql-indent-1 {
                margin-left: 15px;
            }
            .ql-indent-2 {
                margin-left: 30px;
            }
            .ql-indent-3 {
                margin-left: 45px;
            }`}
          </style>
        </section>
        <button onClick={handleExportPDF}>Export PDF</button>
        <button onClick={handleExportEpub}>Export ePub</button>
      </div>
    </section>
  );
};

export default LivePreview;

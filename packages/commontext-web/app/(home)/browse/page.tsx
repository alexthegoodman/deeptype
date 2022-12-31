"use client";

import request from "graphql-request";
import { newDocumentMutation } from "../../../graphql/document";
import styles from "./page.module.scss";

export default function Browse() {
  const openNewDocument = async () => {
    const { newDocument } = await request(
      "http://localhost:4000/graphql",
      newDocumentMutation
    );

    console.info("newDocument", newDocument);
  };

  return (
    <section className={styles.documentGrid}>
      <div className={styles.documentGridInner}>
        <div className={styles.newDocument} onClick={openNewDocument}>
          <div className={styles.previewSpace}>
            <i className="ph-plus-thin"></i>
          </div>
          <span>New Document</span>
        </div>
        <div className={styles.document}>
          <div className={styles.documentPreview}></div>
          <span>Document Title</span>
        </div>
      </div>
    </section>
  );
}

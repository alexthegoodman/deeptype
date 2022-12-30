"use client";

import { useReducer } from "react";
import EditorField from "../../components/EditorField/EditorField";
import EditorHeader from "../../components/EditorHeader/EditorHeader";
import Information from "../../components/Information/Information";
import {
  EditorContext,
  EditorContextReducer,
  EditorContextState,
} from "../../context/EditorContext/EditorContext";
import styles from "./page.module.scss";

export default function Editor() {
  return (
    <EditorContext.Provider
      value={useReducer(EditorContextReducer, EditorContextState)}
    >
      <main className={styles.editorContainer}>
        <EditorHeader />
        <div className={styles.editorWrapper}>
          <section className={styles.editor}>
            <div>
              <section className={styles.editorField}>
                <EditorField />
              </section>
            </div>
          </section>
          <aside className={styles.intelSidebar}>
            <div className={styles.intelSidebarInner}>
              <Information />
            </div>
          </aside>
        </div>
      </main>
    </EditorContext.Provider>
  );
}

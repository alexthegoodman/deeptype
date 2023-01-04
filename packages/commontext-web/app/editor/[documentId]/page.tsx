"use client";

import { useReducer } from "react";
import { useCookies } from "react-cookie";
import EditorDescriptor from "../../../components/EditorDescriptor/EditorDescriptor";
import EditorField from "../../../components/EditorField/EditorField";
import EditorHeader from "../../../components/EditorHeader/EditorHeader";
import Information from "../../../components/Information/Information";
import {
  EditorContext,
  EditorContextReducer,
  EditorContextState,
} from "../../../context/EditorContext/EditorContext";
import styles from "./page.module.scss";
import useSWR from "swr";
import graphClient from "../../../helpers/GQLClient";
import { documentQuery } from "../../../graphql/document";

const getDocumentData = async (token: string, documentId: string) => {
  graphClient.setupClient(token);

  const { document } = await graphClient.client?.request(documentQuery, {
    documentId,
  });

  return document;
};

export default function Editor({ params }) {
  const documentId = params.documentId;
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data, error, isLoading, mutate } = useSWR(
    "documentKey" + documentId,
    () => getDocumentData(token, documentId)
  );

  // console.info("document data", documentId, data, error, isLoading);

  return (
    <EditorContext.Provider
      value={useReducer(EditorContextReducer, EditorContextState)}
    >
      <main className={styles.editorContainer}>
        <EditorHeader documentId={documentId} documentData={data} />
        <div className={styles.editorWrapper}>
          <section className={styles.editor}>
            <div>
              <section className={styles.editorField}>
                <EditorField documentId={documentId} documentData={data} />
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

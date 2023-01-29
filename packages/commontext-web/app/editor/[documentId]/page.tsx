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
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { BounceLoader } from "react-spinners";
import Loader from "../../../components/Loader/Loader";

const getDocumentData = async (token: string, documentId: string) => {
  graphClient.setupClient(token);

  const { document } = await graphClient.client?.request(documentQuery, {
    documentId,
  });

  return document;
};

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

export default function Editor(props) {
  const { params } = props;
  const documentId = params.documentId;
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const windowSize = useWindowSize();

  const { data, error, isLoading, mutate } = useSWR(
    "documentKey" + documentId,
    () => getDocumentData(token, documentId),
    {
      revalidateOnMount: true,
    }
  );

  const refetch = async () => {
    const newData = await getDocumentData(token, documentId);
    console.info("refetch document data", newData);
    mutate(newData);
  };

  let body = <></>;

  if (isLoading) body = <Loader />;
  if (error) body = <span>Error...</span>;
  if (!isLoading && !error)
    body = (
      <section className={styles.editorGroupWrapper}>
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
            <EditorField documentId={documentId} documentData={data} />
          </Panel>
          <ResizeHandle />
          <Panel className={styles.panel} order={2}>
            <Information />
          </Panel>
        </PanelGroup>
      </section>
    );

  console.info("document data", documentId, data, error, isLoading);

  return (
    <EditorContext.Provider
      value={useReducer(EditorContextReducer, EditorContextState)}
    >
      <main className={styles.editorContainer}>
        <EditorHeader
          documentId={documentId}
          documentData={data}
          refetchDocument={refetch}
        />
        {body}
        {/* <div className={styles.editorWrapper}>
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
        </div> */}
      </main>
    </EditorContext.Provider>
  );
}

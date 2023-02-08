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
  useEditorContext,
} from "../../../context/EditorContext/EditorContext";
import styles from "./page.module.scss";
import useSWR from "swr";
import graphClient from "../../../helpers/GQLClient";
import { documentQuery } from "../../../graphql/document";

import { useWindowSize } from "../../../hooks/useWindowSize";
import Loader from "../../../components/Loader/Loader";
import EditorGroup from "../../../components/EditorGroup/EditorGroup";
import { getDocumentData } from "../../../api/document";

export default function Editor(props) {
  const { params } = props;
  const documentId = params.documentId;
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

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

  // console.info("document data", documentId, data, error, isLoading);

  let body = <></>;

  if (isLoading) body = <Loader />;
  if (error) body = <span>Error...</span>;
  if (!isLoading && !error)
    body = <EditorGroup documentId={documentId} documentData={data} />;

  return (
    <EditorContext.Provider
      value={useReducer(EditorContextReducer, EditorContextState)}
    >
      <main className={styles.editorContainer}>
        {/* <EditorHeader
          documentId={documentId}
          documentData={data}
          refetchDocument={refetch}
        /> */}
        {body}
      </main>
    </EditorContext.Provider>
  );
}

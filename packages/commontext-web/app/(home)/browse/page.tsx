"use client";

import request from "graphql-request";
import { useCookies } from "react-cookie";
import useSWR from "swr";

import {
  myDocumentsQuery,
  newDocumentMutation,
} from "../../../graphql/document";
import graphClient from "../../../helpers/GQLClient";
import { graphqlUrl } from "../../../defs/urls";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

const getDocumentsData = async (token: string) => {
  graphClient.setupClient(token);

  const { myDocuments } = await graphClient.client?.request(myDocumentsQuery);

  return myDocuments;
};

export default function Browse() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const { data, error, isLoading, mutate } = useSWR("browseKey", () =>
    getDocumentsData(token)
  );

  console.info("data", data, isLoading, error);

  const openNewDocument = async () => {
    const { newDocument } = await graphClient.client?.request(
      newDocumentMutation
    );

    console.info("newDocument", newDocument);

    router.push(`/editor/${newDocument.id}`);
  };

  const openDocument = (documentId: string) => {
    router.push(`/editor/${documentId}`);
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
        {isLoading ? <>Loading...</> : <></>}
        {error ? <>{error}</> : <></>}
        {!isLoading && !error ? (
          <>
            {data.map((document: any) => {
              return (
                <div
                  key={document.id}
                  className={styles.document}
                  onClick={() => openDocument(document.id)}
                >
                  <div className={styles.documentPreview}></div>
                  <span>{document.title}</span>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}

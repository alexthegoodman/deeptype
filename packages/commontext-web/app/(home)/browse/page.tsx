"use client";

import request from "graphql-request";
import { useCookies } from "react-cookie";
import useSWR from "swr";

import {
  myDocumentsQuery,
  newDocumentMutation,
} from "../../../graphql/document";
import graphClient from "../../../helpers/GQLClient";
import styles from "./page.module.scss";

const getDocumentsData = async (token: string) => {
  graphClient.setupClient(token);

  const { myDocuments } = await graphClient.client?.request(myDocumentsQuery);

  return myDocuments;
};

export default function Browse() {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data, error, isLoading, mutate } = useSWR("browseKey", () =>
    getDocumentsData(token)
  );

  console.info("data", data, isLoading, error);

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
        {isLoading ? <>Loading...</> : <></>}
        {error ? <>{error}</> : <></>}
        {!isLoading && !error ? (
          <>
            {data.map((document, i) => {
              return (
                <div key={document.id} className={styles.document}>
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

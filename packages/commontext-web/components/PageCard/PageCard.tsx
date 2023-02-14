import * as React from "react";

import styles from "./PageCard.module.scss";

import { PageCardProps } from "./PageCard.d";
import BasicCard from "../BasicCard/BasicCard";
import CardLinks from "../CardLinks/CardLinks";
import SaveLink from "../SaveLink/SaveLink";

const PageCard: React.FC<PageCardProps> = ({
  documentId = "",
  result = null,
}) => {
  return (
    <BasicCard
      header={<span>Web Page</span>}
      body={
        <div className={styles.resultBody}>
          <span>
            <strong>{result.metaTitle}</strong>
          </span>
          <span>Load Time: {result.loadSpeedScore / 1000}s</span>
          <a href={result.url} target="_blank">
            {result.url}
          </a>
          <p>Excerpt: {result.excerpt ? result.excerpt : "None"}</p>
          <CardLinks title="Outgoing Links:" links={result.outgoingLinks} />
        </div>
      }
      footerLeft={
        <>
          {documentId !== "" ? (
            <SaveLink documentId={documentId} type="PAGE" data={result} />
          ) : (
            <></>
          )}
        </>
      }
    />
  );
};

export default PageCard;

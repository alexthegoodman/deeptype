import * as React from "react";

import styles from "./SavedItems.module.scss";

import { SavedItemsProps } from "./SavedItems.d";
import BasicCard from "../BasicCard/BasicCard";
import PageCard from "../PageCard/PageCard";
import InfoCard from "../InfoCard/InfoCard";

const SavedItems: React.FC<SavedItemsProps> = ({
  documentId = "",
  documentData = null,
}) => {
  return (
    <section className={styles.savedItems}>
      <div className={styles.savedItemsInner}>
        {documentData?.savedItems?.map((savedItem) => {
          if (savedItem.type === "SUMMARY") {
            return <InfoCard item={savedItem.data} />;
          }
          if (savedItem.type === "PAGE") {
            return <PageCard result={savedItem.data} />;
          }
        })}
      </div>
    </section>
  );
};

export default SavedItems;

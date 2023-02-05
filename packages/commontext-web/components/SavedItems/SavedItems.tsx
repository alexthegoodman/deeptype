import * as React from "react";

import styles from "./SavedItems.module.scss";

import { SavedItemsProps } from "./SavedItems.d";
import BasicCard from "../BasicCard/BasicCard";

const SavedItems: React.FC<SavedItemsProps> = ({ documentData = null }) => {
  return (
    <section className={styles.savedItems}>
      <div className={styles.savedItemsInner}>
        {documentData?.savedItems?.map((savedItem) => (
          <BasicCard
            header={<span>{savedItem.type}</span>}
            body={<p>{savedItem.data.summary}</p>}
          />
        ))}
      </div>
    </section>
  );
};

export default SavedItems;

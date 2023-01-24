import * as React from "react";

import styles from "./Meta.module.scss";

import { MetaProps } from "./Meta.d";

const Meta: React.FC<MetaProps> = ({ title = "Surface Relevant Information as You Type", description = "" }) => {
  const metaTitle = title + " | DeepType"
  return (
    <>
      <title>{metaTitle}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <script src="https://unpkg.com/phosphor-icons" async></script>
    </>
  );
};

export default Meta;

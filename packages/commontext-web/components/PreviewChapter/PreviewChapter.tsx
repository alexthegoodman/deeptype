import * as React from "react";

import styles from "./PreviewChapter.module.scss";

import { PreviewChapterProps } from "./PreviewChapter.d";

const PreviewChapter: React.FC<PreviewChapterProps> = ({ title = "" }) => {
  return <h1>{title}</h1>;
};

export default PreviewChapter;

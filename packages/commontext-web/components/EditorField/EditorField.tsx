"use client";
import "client-only";

import * as React from "react";

import styles from "./EditorField.module.scss";

import { EditorFieldProps } from "./EditorField.d";
import EditorInnerField from "../EditorInnerField/EditorInnerField";

const EditorField: React.FC<EditorFieldProps> = () => {
  const [Quill, setQuill] = React.useState<any>(null);
  const [ReactQuill, setReactQuill] = React.useState<any>(null);

  const loadQuillJs = async () => {
    const quill = await import("quill");
    const reactQuill = await import("react-quill");
    setQuill(quill);
    setReactQuill(reactQuill);
  };

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      loadQuillJs();
    }
  }, []);

  return (
    <section>
      <div>
        {ReactQuill ? (
          <EditorInnerField Quill={Quill} ReactQuill={ReactQuill} />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default EditorField;

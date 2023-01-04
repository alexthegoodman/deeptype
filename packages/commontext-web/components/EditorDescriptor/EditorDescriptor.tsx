import * as React from "react";

import styles from "./EditorDescriptor.module.scss";

import { EditorDescriptorProps } from "./EditorDescriptor.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";

const EditorDescriptor: React.FC<EditorDescriptorProps> = ({
  documentData = null,
}) => {
  const [{ editorDescriptor }, dispatch] = useEditorContext();

  const descriptorInput = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "editorDescriptor", payload: e.currentTarget.value });
  };

  return (
    <>
      <input
        className={styles.descriptorInput}
        type="text"
        placeholder="Enter 1-3 Words About This Content"
        onInput={descriptorInput}
        defaultValue={documentData?.descriptor}
      />
    </>
  );
};

export default EditorDescriptor;

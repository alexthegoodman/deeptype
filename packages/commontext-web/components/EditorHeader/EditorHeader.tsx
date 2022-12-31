import * as React from "react";

import styles from "./EditorHeader.module.scss";

import { EditorHeaderProps } from "./EditorHeader.d";
import Link from "next/link";
// import { ArrowCircleLeft } from "phosphor-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import { useDebounce } from "../../hooks/useDebounce";

const EditorHeader: React.FC<EditorHeaderProps> = () => {
  const [{ editorJson, editorTitle }, dispatch] = useEditorContext();
  const debouncedTitle = useDebounce(editorTitle, 500);
  const debouncedJson = useDebounce(editorJson, 500);

  React.useEffect(() => {
    if (debouncedTitle) {
      // TODO: save only title
    }
    if (debouncedTitle && debouncedJson) {
      // TODO: save json and title
    }
  }, [debouncedTitle, debouncedJson]);

  const onTitleChange = (e: any) => {
    dispatch({ type: "editorTitle", payload: e.target.outerText });
  };

  return (
    <header className={styles.editorHeader}>
      <div className={styles.editorHeaderInner}>
        <div className={styles.left}>
          <Link href="/browse" className={styles.headerBack}>
            <i className="ph-arrow-circle-left-thin"></i>
          </Link>
        </div>
        <div className={styles.center}>
          <div className={styles.headerInfo}>
            <span
              className={styles.docTitle}
              contentEditable={true}
              onInput={onTitleChange}
            ></span>
            <span className={styles.savedDate}>Autosaved on 12/12/12</span>
          </div>
        </div>
        <div className={styles.right}>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;

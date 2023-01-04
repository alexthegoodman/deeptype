import * as React from "react";

import styles from "./EditorHeader.module.scss";

import { EditorHeaderProps } from "./EditorHeader.d";
import Link from "next/link";
// import { ArrowCircleLeft } from "phosphor-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useCookies } from "react-cookie";
import graphClient from "../../helpers/GQLClient";
import { updateDocumentMutation } from "../../graphql/document";

const EditorHeader: React.FC<EditorHeaderProps> = ({
  documentId = "",
  documentData = null,
}) => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const [{ editorJson, editorTitle, editorDescriptor }, dispatch] =
    useEditorContext();
  const debouncedTitle = useDebounce(editorTitle, 500);
  const debouncedJson = useDebounce(editorJson, 500);
  const debouncedDescriptor = useDebounce(editorDescriptor, 500);

  const updateDocument = async (args: any) => {
    const { updateDocument } = await graphClient.client?.request(
      updateDocumentMutation,
      {
        documentId,
        ...args,
      }
    );

    console.info("updatedDocument", updateDocument);
  };

  React.useEffect(() => {
    if (debouncedTitle) {
      updateDocument({ title: debouncedTitle });
    }
  }, [debouncedTitle]);

  React.useEffect(() => {
    if (debouncedJson) {
      // TODO: verify json over graphql
      updateDocument({ content: debouncedJson });
    }
  }, [debouncedJson]);

  React.useEffect(() => {
    if (debouncedDescriptor) {
      updateDocument({ descriptor: debouncedDescriptor });
    }
  }, [debouncedDescriptor]);

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
            >
              {documentData?.title}
            </span>
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

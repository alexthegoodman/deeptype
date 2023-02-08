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
const { DateTime } = require("luxon");

const EditorHeader: React.FC<EditorHeaderProps> = ({
  documentId = "",
  documentData = null,
  refetchDocument = () => console.info("refetchDocument"),
}) => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const [
    { editorJson, editorTitle, editorDescriptor, focusModeEnabled },
    dispatch,
  ] = useEditorContext();
  const debouncedTitle = useDebounce(editorTitle, 500);
  const debouncedJson = useDebounce(editorJson, 500);
  const debouncedDescriptor = useDebounce(editorDescriptor, 500);
  const [lastSaved, setLastSaved] = React.useState<string | null>(null);

  const updateDocument = async (args: any) => {
    const { updateDocument } = await graphClient.client?.request(
      updateDocumentMutation,
      {
        documentId,
        ...args,
      }
    );

    const currentTime = new Date().toISOString();
    setLastSaved(currentTime);

    console.info("updatedDocument", updateDocument);

    refetchDocument();
  };

  React.useEffect(() => {
    if (debouncedTitle) {
      updateDocument({ title: debouncedTitle });
    }
  }, [debouncedTitle]);

  React.useEffect(() => {
    if (debouncedJson) {
      // console.info("debouncedJson", debouncedJson);
      updateDocument({ content: JSON.stringify(debouncedJson) });
    }
  }, [debouncedJson]);

  React.useEffect(() => {
    if (debouncedDescriptor !== null) {
      updateDocument({ descriptor: debouncedDescriptor });
    }
  }, [debouncedDescriptor]);

  const onTitleChange = (e: any) => {
    console.info("title change", e.target.value);
    dispatch({ type: "editorTitle", payload: e.target.value });
  };

  if (focusModeEnabled) return <></>;

  return (
    <header className={styles.editorHeader}>
      <div className={styles.editorHeaderInner}>
        {/* <div className={styles.left}>
          <Link href="/browse" className={styles.headerBack}>
            <i className="ph-arrow-circle-left-thin"></i>
          </Link>
        </div> */}
        <div className={styles.center}>
          <div className={styles.headerInfo}>
            <input
              className={styles.docTitle}
              onChange={onTitleChange}
              defaultValue={documentData?.title}
              placeholder="Document Title"
            />
            <span className={styles.savedDate}>
              Autosaved on{" "}
              {DateTime.fromISO(lastSaved).toLocaleString(
                DateTime.DATETIME_FULL
              )}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;

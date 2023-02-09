import * as React from "react";
import useSWR, { mutate } from "swr";

import styles from "./DocumentTree.module.scss";

import { DocumentTreeProps } from "./DocumentTree.d";
import { getDocumentsData } from "../../api/document";
import { useCookies } from "react-cookie";
import Link from "next/link";
import { getUserData, updateUserData } from "../../helpers/requests";
import graphClient from "../../helpers/GQLClient";
import { newDocumentMutation } from "../../graphql/document";

const DocumentTree: React.FC<DocumentTreeProps> = ({ documentId = "" }) => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const { data: userData } = useSWR("homeLayout", () => getUserData(token), {
    revalidateOnMount: true,
  });

  const treeData = userData ? userData.documentTree : [];

  const {
    data: documentsData,
    error,
    isLoading,
    // mutate,
  } = useSWR("browseKey", () => getDocumentsData(token));

  console.info("documents data", userData, documentsData);

  const addToChildren = (obj, newId, targetId) => {
    if (obj.children) {
      obj.children.forEach((child) => {
        if (child.id === targetId) {
          child.children.push({ id: newId, folded: true, children: [] });
        }
        addToChildren(child, newId, targetId);
      });
    }
  };

  const addPageHandler = async (parentId = null) => {
    // create new document
    const { newDocument } = await graphClient.client?.request(
      newDocumentMutation
    );

    // if parentId supplied, add to its children
    let newTree = treeData;
    if (parentId) {
      addToChildren(newTree, newDocument.id, parentId);
    } else {
      if (newTree === null) newTree = [];
      newTree.push({ id: newDocument.id, folded: true, children: [] });
    }

    // save new tree

    mutate("browseKey", () => getDocumentsData(token));
    mutate("homeLayout", () => updateUserData(token, newTree), {
      optimisticData: { ...userData, documentTree: newTree },
    });
  };

  const displayChildren = (obj, addPage) => {
    return obj.children ? (
      <ul>
        {obj.children.map((child) => {
          const childData = documentsData.filter(
            (document) => document.id === child.id
          )[0];

          const newAddPage = (
            <li
              className={styles.addDocument}
              onClick={() => addPageHandler(child.id)}
            >
              <i className="ph-plus-thin"></i>
              <span>Add Document</span>
            </li>
          );

          return (
            <>
              <li className={child.folded ? styles.folded : ""}>
                <Link
                  className={documentId === child.id ? styles.selected : ""}
                  href={`/editor/${child.id}`}
                  draggable="true"
                >
                  <i className="ph-caret-right-thin"></i>
                  <span>{childData.title}</span>
                </Link>{" "}
                {child.id ? displayChildren(child, newAddPage) : <></>}
              </li>
            </>
          );
        })}
        {addPage}
      </ul>
    ) : (
      <ul>{addPage}</ul>
    );
  };

  if (isLoading) return <></>;
  if (error) return <>{error}</>;

  const newTopLevelPage = (
    <ul>
      <li className={styles.addDocument} onClick={() => addPageHandler()}>
        <i className="ph-plus-thin"></i>
        <span>Add Document</span>
      </li>
    </ul>
  );

  return (
    <section className={styles.documentTree}>
      <div className={styles.documentTreeInner}>
        <span className={styles.treeHeadline}>Your Documents</span>
        {treeData && typeof treeData === "object" ? (
          treeData.map((item) => {
            const itemData = documentsData.filter(
              (document) => document.id === item.id
            )[0];

            const newAddPage = (
              <li
                className={styles.addDocument}
                onClick={() => addPageHandler(item.id)}
              >
                <i className="ph-plus-thin"></i>
                <span>Add Document</span>
              </li>
            );

            return (
              <>
                <ul>
                  <>
                    <li className={item.folded ? styles.folded : ""}>
                      <Link
                        className={
                          documentId === item.id ? styles.selected : ""
                        }
                        href={`/editor/${item.id}`}
                        draggable="true"
                      >
                        <i className="ph-caret-right-thin"></i>
                        <span>{itemData?.title}</span>
                      </Link>
                      {item.id ? displayChildren(item, newAddPage) : <></>}
                    </li>
                  </>
                  {/* {newAddPage} */}
                </ul>
              </>
            );
          })
        ) : (
          <></>
        )}
        {newTopLevelPage}
      </div>
    </section>
  );
};

export default DocumentTree;

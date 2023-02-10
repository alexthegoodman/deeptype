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

  const foldChildren = (obj, targetId) => {
    if (obj.children) {
      obj.children.forEach((child) => {
        if (child.id === targetId) {
          child.folded = !child.folded;
        }
        foldChildren(child, targetId);
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
      newTree.forEach((item) => {
        if (item.id === parentId) {
          item.children.push({
            id: newDocument.id,
            folded: true,
            children: [],
          });
        }
        addToChildren(item, newDocument.id, parentId);
      });
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

  const toggleFold = (targetId) => {
    let newTree = treeData;

    newTree.forEach((item) => {
      if (item.id === targetId) {
        item.folded = !item.folded;
      }
      foldChildren(item, targetId);
    });

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
              <span>
                <i className="ph-plus-thin"></i>Add Document
              </span>
            </li>
          );

          return (
            <>
              <li className={child.folded ? styles.folded : ""}>
                <span
                  className={documentId === child.id ? styles.selected : ""}
                >
                  <i
                    className="ph-caret-right-thin"
                    onClick={() => toggleFold(child.id)}
                  ></i>

                  <Link href={`/editor/${child.id}`} draggable="true">
                    {childData?.title}
                  </Link>
                </span>

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
        <span>
          {" "}
          <i className="ph-plus-thin"></i> Add Document
        </span>
      </li>
    </ul>
  );

  return (
    <section className={styles.documentTree}>
      <div className={styles.documentTreeInner}>
        <span className={styles.treeHeadline}>Your Documents</span>
        {treeData && typeof treeData === "object" && documentsData ? (
          treeData.map((item) => {
            const itemData = documentsData.filter(
              (document) => document.id === item.id
            )[0];

            const newAddPage = (
              <li
                className={styles.addDocument}
                onClick={() => addPageHandler(item.id)}
              >
                <span>
                  <i className="ph-plus-thin"></i> Add Document
                </span>
              </li>
            );

            return (
              <>
                <ul>
                  <>
                    <li className={item.folded ? styles.folded : ""}>
                      <span
                        className={
                          documentId === item.id ? styles.selected : ""
                        }
                      >
                        <i
                          className="ph-caret-right-thin"
                          onClick={() => toggleFold(item.id)}
                        ></i>

                        <Link href={`/editor/${item.id}`} draggable="true">
                          {itemData?.title}
                        </Link>
                      </span>

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

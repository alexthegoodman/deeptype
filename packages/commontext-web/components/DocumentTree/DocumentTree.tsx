import * as React from "react";
import useSWR from "swr";

import styles from "./DocumentTree.module.scss";

import { DocumentTreeProps } from "./DocumentTree.d";
import { getDocumentsData } from "../../api/document";
import { useCookies } from "react-cookie";
import Link from "next/link";

const DocumentTree: React.FC<DocumentTreeProps> = () => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const {
    data: documentsData,
    error,
    isLoading,
    mutate,
  } = useSWR("browseKey", () => getDocumentsData(token));

  console.info("document tree", documentsData);

  const treeData = [
    {
      id: "4cfdc067-7376-42ef-af40-0363f67bd27b",
      folded: false,
      // color: ""
      // icon: ""
      children: [
        {
          id: "e70ecff7-849c-4a9f-96b3-5d1918a2d430",
          folded: false,
          children: [
            {
              id: "0b1962a5-e92c-467a-a3fb-c713f4526fe4",
              folded: true,
            },
            {
              id: "3628eed6-3164-4184-80a8-6ec1569a7b2f",
              folded: true,
            },
          ],
        },
        {
          id: "fef5b7b5-dd70-4afc-86c8-fbe7ceca4cee",
          folded: true,
        },
      ],
    },
    {
      id: "d738b38e-1e7a-474e-8a30-32450f1f3917",
      folded: true,
    },
    {
      id: "fabf5aa3-07dd-4f94-a67d-bce2ee67afa2",
      folded: true,
    },
  ];

  const displayChildren = (obj) => {
    return obj.children ? (
      <ul>
        {obj.children.map((child) => {
          const childData = documentsData.filter(
            (document) => document.id === child.id
          )[0];

          return (
            <li className={child.folded ? styles.folded : ""}>
              <Link href={`/editor/${child.id}`} draggable="true">
                <i className="ph-caret-right-thin"></i>
                <span>{childData.title}</span>
              </Link>{" "}
              {displayChildren(child)}
            </li>
          );
        })}
      </ul>
    ) : (
      <></>
    );
  };

  if (isLoading) return <></>;
  if (error) return <>{error}</>;

  return (
    <section className={styles.documentTree}>
      <div className={styles.documentTreeInner}>
        <span className={styles.treeHeadline}>Your Documents</span>
        {treeData.map((item) => {
          const itemData = documentsData.filter(
            (document) => document.id === item.id
          )[0];

          return (
            <>
              <ul>
                <li className={item.folded ? styles.folded : ""}>
                  <Link href={`/editor/${item.id}`} draggable="true">
                    <i className="ph-caret-right-thin"></i>
                    <span>{itemData.title}</span>
                  </Link>
                  {displayChildren(item)}
                </li>
              </ul>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default DocumentTree;

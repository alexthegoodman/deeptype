"use client";

import Link from "next/link";
import { useCookies } from "react-cookie";
import graphClient from "../../helpers/GQLClient";
import { getUserData } from "../../helpers/requests";
import { getDocumentsData } from "../../api/document";
import useSWR from "swr";

import styles from "./page.module.scss";

const getSubTree = function (subMenuItems, id) {
  if (subMenuItems) {
    for (var i = 0; i < subMenuItems.length; i++) {
      if (subMenuItems[i].id == id) {
        return subMenuItems[i];
      }
      var found = getSubTree(subMenuItems[i].children, id);
      if (found) return found;
    }
  }
};

export default function Publish() {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const { data: userData } = useSWR("homeLayout", () => getUserData(token), {
    revalidateOnMount: true,
  });

  const treeData = userData ? userData.documentTree : [];

  console.info("treeData", treeData);

  const {
    data: documentsData,
    error,
    isLoading,
    // mutate,
  } = useSWR("browseKey", () => getDocumentsData(token));

  return (
    <section className={styles.publish}>
      <div className={styles.publishInner}>
        <section className={styles.publishHeader}>
          <div>
            <Link href="/editor">
              <i className="ph-arrow-left"></i>Back to Editor
            </Link>
          </div>
          <div>
            <h1>Your Books</h1>
            <p>
              All of your books and related reader analytics are available here.
            </p>
          </div>
        </section>
        <section className={styles.bookGrid}>
          {documentsData?.map((document) => {
            const subTree = getSubTree(treeData, document.id);
            const numOfChapters = subTree?.children?.filter((child) => {
              const childData = documentsData.find(
                (doc) => doc.id === child.id
              );
              return childData.preset === "chapter";
            }).length;

            if (document.preset === "book") {
              return (
                <div className={styles.bookItem}>
                  <div className={styles.bookHeader}>
                    <h2>{document.title}</h2>
                    <span>{numOfChapters} Chapters</span>
                  </div>
                  <div className={styles.bookCtrls}>
                    <button>Print Settings</button>
                    <button>Dowload Print-Ready PDF</button>
                    <button>eBook Settings</button>
                    <button>Download Kindle-Ready ePub</button>
                    {/** Coming Soon: Beta Reading */}
                  </div>
                </div>
              );
            }
          })}
        </section>
      </div>
    </section>
  );
}

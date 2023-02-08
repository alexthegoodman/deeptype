"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import DocumentTree from "../../components/DocumentTree/DocumentTree";
import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import graphClient from "../../helpers/GQLClient";

import styles from "./layout.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;
  const router = useRouter();

  graphClient.setupClient(token);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);

  return (
    <section className={styles.editorLayout}>
      <div className={styles.editorLayoutInner}>
        <aside className={styles.documentTreeSidebar}>
          <div className={styles.sidebarInner}>
            <ProfileMenu />
            <DocumentTree />
          </div>
        </aside>
        <section className={styles.documentEditorWrapper}>
          <div className={styles.wrapperInner}>{children}</div>
        </section>
      </div>
    </section>
  );
}

"use client";

import { useRouter, usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const documentId = pathname?.split("/")[2];

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
            <DocumentTree documentId={documentId} />
          </div>
        </aside>
        <section className={styles.documentEditorWrapper}>
          <div className={styles.wrapperInner}>{children}</div>
        </section>
      </div>
    </section>
  );
}

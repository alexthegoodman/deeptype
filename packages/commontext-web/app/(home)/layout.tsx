import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";

import styles from "./page.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  const nextCookies = cookies();
  const coUserToken = nextCookies.get("coUserToken");

  if (!coUserToken) {
    redirect("/");
  }

  return (
    <section className={styles.homeLayout}>
      <HomeHeader />
      <section className={styles.homeBody}>
        <HomeSidebar />
        {children}
      </section>
    </section>
  );
}

"use client";

import request from "graphql-request";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import PricingInfo from "../../components/PricingInfo/PricingInfo";
import { graphqlUrl } from "../../defs/urls";
import {
  confirmFreemiumMutation,
  getCurrentUserQuery,
  newCheckoutMutation,
} from "../../graphql/user";
import graphClient from "../../helpers/GQLClient";
import useSWR from "swr";

import styles from "./page.module.scss";
import IntroHero from "../../components/IntroHero/IntroHero";
import { getUserData } from "../../helpers/requests";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  // const nextCookies = cookies();
  // const coUserToken = nextCookies.get("coUserToken");
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;
  const router = useRouter(); // hide for build

  graphClient.setupClient(token);

  useEffect(() => {
    if (!token) {
      // redirect("/");
      router.push("/");
      // window.location = "/" as unknown as Location;
    }
  }, [token]);

  const { data, error, isLoading, mutate } = useSWR(
    "homeLayout",
    () => getUserData(token),
    {
      revalidateOnMount: true,
    }
  );

  console.info("getCurrentUser", data, isLoading);

  let homeBody = <></>;

  if (isLoading) {
    homeBody = <>Loading...</>;
  } else if (data) {
    if (data.subscription === "NONE") {
      const newCheckout = async (type = "MONTHLY") => {
        const { newCheckout } = await graphClient.client?.request(
          newCheckoutMutation,
          {
            frequency: type,
          }
        );
        console.info("newCheckout 2", type, newCheckout);
        window.location = newCheckout;
      };

      const confirmFreemium = async () => {
        const { confirmFreemium } = await graphClient.client?.request(
          confirmFreemiumMutation
        );
        console.info("confirmFreemium", confirmFreemium);
        window.location.reload();
      };

      const freeBtn = (
        <a className={styles.btn} onClick={confirmFreemium}>
          Select Free
        </a>
      );
      const monthlyBtn = (
        <a className={styles.btn} onClick={() => newCheckout("MONTHLY")}>
          Select Monthly
        </a>
      );
      const annualBtn = (
        <a className={styles.btn} onClick={() => newCheckout("ANNUAL")}>
          Select Annual
        </a>
      );

      homeBody = (
        <section>
          <IntroHero headline="Welcome" subHeadline="Select a Plan" />
          <PricingInfo
            leftBtn={freeBtn}
            centerBtn={monthlyBtn}
            rightBtn={annualBtn}
          />
        </section>
      );
    } else if (data.subscription === "STARTER" || data.subscription === "PRO") {
      homeBody = (
        <>
          <HomeSidebar />
          {children}
        </>
      );
    }
  }

  return (
    <section className={styles.homeLayout}>
      <HomeHeader />
      <section className={styles.homeBody}>{homeBody}</section>
    </section>
  );
}

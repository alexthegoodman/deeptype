"use client";

import request from "graphql-request";
import { cookies } from "next/headers";
import { redirect, useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import PricingInfo from "../../components/PricingInfo/PricingInfo";
import { graphqlUrl } from "../../defs/urls";
import { getCurrentUserQuery, newCheckoutMutation } from "../../graphql/user";
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
  } else {
    if (data.subscription === "NONE") {
      const newMonthlyCheckout = async () => {
        const { newCheckout } = await graphClient.client?.request(
          newCheckoutMutation,
          {
            frequency: "MONTHLY",
          }
        );
        console.info("newCheckout 1", newCheckout);
        window.location = newCheckout;
      };
      const newAnnualCheckout = async () => {
        const { newCheckout } = await graphClient.client?.request(
          newCheckoutMutation,
          {
            frequency: "ANNUAL",
          }
        );
        console.info("newCheckout 2", newCheckout);
        window.location = newCheckout;
      };

      const monthlyBtn = (
        <a className={styles.btn} onClick={newMonthlyCheckout}>
          Select Plan
        </a>
      );
      const annualBtn = (
        <a className={styles.btn} onClick={newAnnualCheckout}>
          Select Plan
        </a>
      );

      homeBody = (
        <section>
          <IntroHero headline="Welcome" subHeadline="Select a Plan" />
          <PricingInfo leftBtn={monthlyBtn} rightBtn={annualBtn} />
        </section>
      );
    } else if (data.subscription === "STARTER") {
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

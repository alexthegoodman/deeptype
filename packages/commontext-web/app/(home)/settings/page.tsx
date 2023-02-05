"use client";

import LogOutLink from "../../../components/LogOutLink/LogOutLink";
import styles from "./page.module.scss";

import useSWR from "swr";
import {
  getCurrentUserQuery,
  newCheckoutMutation,
} from "../../../graphql/user";
import graphClient from "../../../helpers/GQLClient";
import { useCookies } from "react-cookie";
import ManageSubscriptionLink from "../../../components/ManageSubscriptionLink/ManageSubscriptionLink";

const getUserData = async (token: string) => {
  graphClient.setupClient(token);

  const { getCurrentUser } = await graphClient.client?.request(
    getCurrentUserQuery
  );

  return getCurrentUser;
};

export default function Settings() {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const { data, error, isLoading, mutate } = useSWR(
    "settings",
    () => getUserData(token),
    {
      revalidateOnMount: true,
    }
  );

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

  const monthlyBtn = (
    <a className={styles.btn} onClick={() => newCheckout("MONTHLY")}>
      Start Pro Monthly at $19/mo
    </a>
  );
  const annualBtn = (
    <a className={styles.btn} onClick={() => newCheckout("ANNUAL")}>
      Select Pro Annual at $12/mo
    </a>
  );

  let userInformation = <></>;
  if (!isLoading) {
    userInformation = (
      <div>
        <p>Subscription: {data.subscription}</p>
        {data.subscription === "PRO" ? (
          <>
            <p>Frequency: {data.frequency}</p>
            <p>
              <ManageSubscriptionLink />
            </p>
          </>
        ) : (
          <>
            <p>{monthlyBtn}</p>
            <p>{annualBtn}</p>
          </>
        )}
      </div>
    );
  }

  return (
    <section className={styles.settings}>
      <div className={styles.settingsInner}>
        <h1 className={styles.headline}>Settings</h1>
        <div className={styles.settingsCard}>{userInformation}</div>
        <LogOutLink />
      </div>
    </section>
  );
}

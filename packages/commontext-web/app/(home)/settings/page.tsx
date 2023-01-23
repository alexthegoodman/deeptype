"use client";

import LogOutLink from "../../../components/LogOutLink/LogOutLink";
import styles from "./page.module.scss";

import useSWR from "swr";
import { getCurrentUserQuery } from "../../../graphql/user";
import graphClient from "../../../helpers/GQLClient";
import { useCookies } from "react-cookie";

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

  let userInformation = <></>;
  if (!isLoading) {
    userInformation = (
      <div>
        <p>Subscription: {data.subscription}</p>
        <p>Frequency: {data.frequency}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Settings</h1>
      {userInformation}
      <LogOutLink />
    </div>
  );
}

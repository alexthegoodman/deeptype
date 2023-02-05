import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "./Sidebars.module.scss";

import { SidebarsProps } from "./Sidebars.d";
import Information from "../Information/Information";
import Suggestions from "../Suggestions/Suggestions";
import useSWR from "swr";
import graphClient from "../../helpers/GQLClient";
import { getCurrentUserQuery } from "../../graphql/user";
import { useCookies } from "react-cookie";

const getUserData = async (token: string) => {
  graphClient.setupClient(token);

  const { getCurrentUser } = await graphClient.client?.request(
    getCurrentUserQuery
  );

  return getCurrentUser;
};

const Sidebars: React.FC<SidebarsProps> = () => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const { data, error, isLoading, mutate } = useSWR(
    "settings",
    () => getUserData(token),
    {
      revalidateOnMount: true,
    }
  );

  if (isLoading) return <></>;
  if (error) return <>{error}</>;

  return (
    <Tabs className={styles.sidebars} selectedTabClassName={styles.selectedTab}>
      <TabList className={styles.sidebarsTabList}>
        <Tab>
          <i className="ph-info"></i> Information
        </Tab>
        <Tab>
          <i className="ph-article"></i> Suggestions
        </Tab>
      </TabList>

      <TabPanel>
        <Information />
      </TabPanel>
      <TabPanel>
        {data.subscription === "PRO" ? (
          <Suggestions />
        ) : (
          <p>Please upgrade to a Pro subscription use AI Text Suggestions</p>
        )}
      </TabPanel>
    </Tabs>
  );
};

export default Sidebars;

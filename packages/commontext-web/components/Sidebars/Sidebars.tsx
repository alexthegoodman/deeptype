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
import BasicCard from "../BasicCard/BasicCard";
import SavedItems from "../SavedItems/SavedItems";
import DeepSearch from "../DeepSearch/DeepSearch";

const getUserData = async (token: string) => {
  graphClient.setupClient(token);

  const { getCurrentUser } = await graphClient.client?.request(
    getCurrentUserQuery
  );

  return getCurrentUser;
};

const Sidebars: React.FC<SidebarsProps> = ({
  documentId = "",
  documentData = null,
}) => {
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
        <Tab title="Real-time information feed as you type">
          <i className="ph-info"></i> Information
        </Tab>

        <Tab title="Find links across the web">
          <i className="ph-magnifying-glass"></i> Deep Search
        </Tab>

        <Tab title="Generative AI text completions">
          <i className="ph-article"></i> Suggestions
        </Tab>

        <Tab title="Save items for later">
          <i className="ph-archive"></i> Saved
        </Tab>
      </TabList>

      <TabPanel>
        <Information documentId={documentId} />
      </TabPanel>

      <TabPanel>
        <DeepSearch />
      </TabPanel>

      <TabPanel>
        {data.subscription === "PRO" ? (
          <Suggestions />
        ) : (
          <p>Please upgrade to a Pro subscription to use AI Text Suggestions</p>
        )}
      </TabPanel>

      <TabPanel>
        <SavedItems documentData={documentData} />
      </TabPanel>
    </Tabs>
  );
};

export default Sidebars;

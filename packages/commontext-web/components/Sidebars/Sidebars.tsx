import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import styles from "./Sidebars.module.scss";

import { SidebarsProps } from "./Sidebars.d";
import Information from "../Information/Information";
import Suggestions from "../Suggestions/Suggestions";

const Sidebars: React.FC<SidebarsProps> = () => {
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
        <Suggestions />
      </TabPanel>
    </Tabs>
  );
};

export default Sidebars;

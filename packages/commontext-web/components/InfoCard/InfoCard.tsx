import * as React from "react";

import styles from "./InfoCard.module.scss";

import { InfoCardProps } from "./InfoCard.d";
import BasicCard from "../BasicCard/BasicCard";

const InfoCard: React.FC<InfoCardProps> = ({ item = null }) => {
  return (
    <BasicCard
      header={<span>Summary</span>}
      body={<p>{item.summary}</p>}
      footerLeft={
        <a href={item.url} target="_blank">
          <i className="ph-arrow-square-out-thin"></i>
          <span>Source</span>
        </a>
      }
    />
  );
};

export default InfoCard;

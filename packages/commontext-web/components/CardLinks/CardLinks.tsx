import * as React from "react";

import styles from "./CardLinks.module.scss";

import { CardLinksProps } from "./CardLinks.d";

const CardLinks: React.FC<CardLinksProps> = ({ title = "", links = [] }) => {
  if (links.length < 1) return <></>;

  return (
    <>
      <span>{title}</span>
      <ul>
        {links.map((link) => {
          return (
            <li>
              <a href={link.targetUrl} target="_blank">
                {link.targetUrl}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CardLinks;

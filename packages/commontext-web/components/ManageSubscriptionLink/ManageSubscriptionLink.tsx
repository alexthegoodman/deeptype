import * as React from "react";

import styles from "./ManageSubscriptionLink.module.scss";

import { ManageSubscriptionLinkProps } from "./ManageSubscriptionLink.d";
import graphClient from "../../helpers/GQLClient";
import { getPortalUrlQuery } from "../../graphql/user";
import { useCookies } from "react-cookie";

const ManageSubscriptionLink: React.FC<ManageSubscriptionLinkProps> = () => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const onClick = async () => {
    const { getPortalUrl } = await graphClient.client?.request(
      getPortalUrlQuery
    );
    console.info("getPortalUrl", getPortalUrl);
    window.location = getPortalUrl;
  };

  return (
    <a href="#!" onClick={onClick}>
      Manage Subscription
    </a>
  );
};

export default ManageSubscriptionLink;

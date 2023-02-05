import * as React from "react";

import styles from "./SaveLink.module.scss";

import { SaveLinkProps } from "./SaveLink.d";
import { useCookies } from "react-cookie";
import graphClient from "../../helpers/GQLClient";
import { saveItemMutation } from "../../graphql/document";
import { mutate } from "swr";
import { getDocumentData } from "../../api/document";

const SaveLink: React.FC<SaveLinkProps> = ({
  documentId,
  type,
  data = null,
}) => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  const [saved, setSaved] = React.useState(false);

  graphClient.setupClient(token);

  const saveData = async () => {
    const { addSavedItem } = await graphClient.client?.request(
      saveItemMutation,
      {
        documentId,
        type,
        data: JSON.stringify(data),
      }
    );

    mutate("documentKey" + documentId, () =>
      getDocumentData(token, documentId)
    );

    setSaved(true);

    console.info("addSavedItem", addSavedItem);
  };

  return (
    <a href="#!" onClick={saveData}>
      <i className="ph-archive-tray-thin"></i>
      <span>{saved ? "Saved" : "Save"}</span>
    </a>
  );
};

export default SaveLink;

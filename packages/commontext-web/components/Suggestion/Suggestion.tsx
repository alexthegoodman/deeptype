import * as React from "react";

import styles from "./Suggestion.module.scss";

import { SuggestionProps } from "./Suggestion.d";
import BasicCard from "../BasicCard/BasicCard";
import { useCookies } from "react-cookie";
import graphClient from "../../helpers/GQLClient";
import { getGeneratedTextQuery } from "../../graphql/text";

const Suggestion: React.FC<SuggestionProps> = ({ contextText = "" }) => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const [displayText, setDisplayText] = React.useState<string | null>(null);

  const getGeneratedText = async () => {
    const { getGeneratedText } = await graphClient.client?.request(
      getGeneratedTextQuery,
      {
        contextText,
      }
    );

    console.info("getGeneratedText", getGeneratedText);

    setDisplayText(getGeneratedText);
  };

  React.useEffect(() => {
    // refetch when contextText changes (should be debounced)
    getGeneratedText();
  }, [contextText]);

  return (
    <BasicCard header={<span>Suggestion</span>} body={<p>{displayText}</p>} />
  );
};

export default Suggestion;

import * as React from "react";

import styles from "./DeepSearch.module.scss";

import { DeepSearchProps } from "./DeepSearch.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import { useDebounce } from "../../hooks/useDebounce";
import graphClient from "../../helpers/GQLClient";
import { useCookies } from "react-cookie";
import { baseSearchQuery } from "../../graphql/search";
import request from "graphql-request";
import { searchUrl } from "../../defs/urls";
import Loader from "../Loader/Loader";
import BasicCard from "../BasicCard/BasicCard";
import SaveLink from "../SaveLink/SaveLink";
import CardLinks from "../CardLinks/CardLinks";
import PageCard from "../PageCard/PageCard";

const DeepSearch: React.FC<DeepSearchProps> = ({ documentId = "" }) => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const [{ search }, dispatch] = useEditorContext();
  const debouncedSearch = useDebounce(search, 500);
  const [searchResults, setSearchResults] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchSearchResults = async (query) => {
    setLoading(true);

    const { baseSearch } = await request(searchUrl, baseSearchQuery, {
      query,
    });

    setSearchResults(baseSearch);
    setLoading(false);
  };

  React.useEffect(() => {
    if (debouncedSearch) {
      fetchSearchResults(debouncedSearch);
    }
  }, [debouncedSearch]);

  const searchInput = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch({ type: "search", payload: e.currentTarget.value });
  };

  return (
    <section className={styles.deepSearch}>
      <div className={styles.deepSearchInner}>
        <div className={styles.deepSearchHeader}>
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search the web..."
            onInput={searchInput}
            defaultValue={search}
          />
        </div>
        {loading ? <Loader /> : <></>}
        <div className={styles.searchResults}>
          {searchResults?.map((result) => {
            return <PageCard documentId={documentId} result={result} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default DeepSearch;

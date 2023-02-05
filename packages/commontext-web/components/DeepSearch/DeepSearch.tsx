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

const DeepSearch: React.FC<DeepSearchProps> = () => {
  const [cookies, setCookie] = useCookies(["coUserToken"]);
  const token = cookies.coUserToken;

  graphClient.setupClient(token);

  const [{ search }, dispatch] = useEditorContext();
  const debouncedSearch = useDebounce(search, 500);
  const [searchResults, setSearchResults] = React.useState<any>(null);

  const fetchSearchResults = async (query) => {
    const { baseSearch } = await request(searchUrl, baseSearchQuery, {
      query,
    });

    setSearchResults(baseSearch);
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
            placeholder="Search the web"
            onInput={searchInput}
            defaultValue={search}
          />
        </div>
        <div className={styles.searchResults}>
          {searchResults?.map((result) => {
            return (
              <div className={styles.result}>
                <span>
                  <strong>{result.metaTitle}</strong>
                </span>
                <a href={result.url} target="_blank">
                  {result.url}
                </a>
                <p>{result.excerpt}</p>
                <span>Outgoing Links:</span>
                <ul>
                  {result.outgoingLinks.map((link) => {
                    return (
                      <li>
                        <a href={link.targetUrl} target="_blank">
                          {link.targetUrl}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeepSearch;

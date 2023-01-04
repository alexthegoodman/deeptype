import * as React from "react";

import styles from "./Information.module.scss";

import { InformationProps } from "./Information.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import { useDebounce } from "../../hooks/useDebounce";
import request, { gql } from "graphql-request";
import { searchQuery } from "../../graphql/search";
import { resultDataFactory } from "../../factories/resultData";
// import { Copy, ArrowSquareOut } from "phosphor-react";
import DebugPanel from "../DebugPanel/DebugPanel";
import { ResultData } from "../../defs/resultData";

const Information: React.FC<InformationProps> = () => {
  const [{ editorPlaintext, editorDescriptor }, dispatch] = useEditorContext();
  const debouncedDescriptor = useDebounce(editorDescriptor, 500);
  const debouncedPlaintext = useDebounce(editorPlaintext, 500);

  const [isSearching, setIsSearching] = React.useState(false);
  const [resultData, setResultData] = React.useState<ResultData | null>(null);

  // for testing
  React.useEffect(() => {
    const initialData = resultDataFactory();
    setResultData(initialData);
  }, []);

  // console.info("resultData", resultData);

  React.useEffect(
    () => {
      if (debouncedDescriptor && debouncedDescriptor !== "") {
        const fullText = debouncedPlaintext;
        const recentText = debouncedPlaintext.substring(
          debouncedPlaintext.length - 50
        );

        setIsSearching(true);
        request("http://localhost:4001/graphql", searchQuery, {
          // contextQuery: fullText,
          contextQuery: debouncedDescriptor,
          query: recentText,
        }).then((data) => {
          console.info("data", data);
          setIsSearching(false);
          setResultData(data.search);
        });
      } else {
        // setResultData(null);
        setIsSearching(false);
      }
    },
    [debouncedPlaintext, debouncedDescriptor] // Only call effect if debounced search term changes
  );

  return (
    <section className={styles.information}>
      <div className={styles.informationInner}>
        <DebugPanel resultData={resultData} />

        {/* <h2>Information</h2> */}

        <section className={styles.informationResults}>
          <div className={styles.informationResultsInner}>
            {resultData?.results ? (
              resultData.results.map((item, i) => {
                return (
                  <div key={`resultItem${i}`} className={styles.resultItem}>
                    <div className={styles.itemHeader}>
                      <span>Summary</span>
                    </div>
                    <div className={styles.itemBody}>
                      <p>{item.summary}</p>
                    </div>
                    {/* {item.media.map((item, x) => {
                      return (<img width="50" src={item.url} />)
                    })} */}
                    <div className={styles.itemFooter}>
                      <div className={styles.left}>
                        <a href="#!" target="_blank">
                          {/* <Copy weight="light" size={25} /> */}
                          <i className="ph-copy-thin"></i>
                        </a>
                        <a href={item.url} target="_blank">
                          {/* Visit Source{" "} */}
                          {/* <ArrowSquareOut weight="light" size={25} /> */}
                          <i className="ph-arrow-square-out-thin"></i>
                        </a>
                        {/* <span className={styles.badge}>
                          {item.topicClassification.name}
                        </span> */}
                      </div>
                      <div className={styles.right}>
                        {/* <ArrowCircleRight weight="thin" size={25} /> */}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Information;

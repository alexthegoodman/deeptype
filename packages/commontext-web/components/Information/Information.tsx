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
import { searchUrl } from "../../defs/urls";
import Loader from "../Loader/Loader";
import InfoCard from "../InfoCard/InfoCard";

const Information: React.FC<InformationProps> = ({ documentId = "" }) => {
  const [{ editorPlaintext, editorDescriptor }, dispatch] = useEditorContext();
  const debouncedDescriptor = useDebounce(editorDescriptor, 500);
  const debouncedPlaintext = useDebounce(editorPlaintext, 500);

  const [isSearching, setIsSearching] = React.useState(false);
  const [resultData, setResultData] = React.useState<ResultData | null>(null);

  // for testing
  // React.useEffect(() => {
  //   const initialData = resultDataFactory();
  //   setResultData(initialData);
  // }, []);

  // console.info("resultData", resultData);

  React.useEffect(
    () => {
      if (
        !isSearching &&
        ((debouncedDescriptor && debouncedDescriptor !== "") ||
          (debouncedPlaintext && debouncedPlaintext !== ""))
      ) {
        const fullText = debouncedPlaintext;
        const descriptor =
          typeof debouncedDescriptor !== "undefined" && debouncedDescriptor
            ? debouncedDescriptor
            : "";
        const recentText = debouncedPlaintext.substring(
          debouncedPlaintext.length - 35
        );

        console.info("searching", debouncedDescriptor, recentText);

        setIsSearching(true);
        request(searchUrl, searchQuery, {
          // contextQuery: fullText,
          contextQuery: descriptor,
          query: recentText,
        }).then((data) => {
          console.info("results data", data);
          setIsSearching(false);
          setResultData(data.search);
        });
      } else {
        setResultData(null);
        setIsSearching(false);
      }
    },
    [debouncedPlaintext, debouncedDescriptor] // Only call effect if debounced search term changes
  );

  return (
    <section className={styles.information}>
      <div className={styles.informationInner}>
        {/* <DebugPanel resultData={resultData} /> */}

        {/* <h2>Information</h2> */}

        {isSearching ? <Loader /> : <></>}

        <section className={styles.informationResults}>
          <div className={styles.informationResultsInner}>
            {resultData?.results ? (
              resultData.results.map((item, i) => {
                return (
                  <InfoCard
                    key={`resultItem${i}`}
                    documentId={documentId}
                    item={item}
                  />
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

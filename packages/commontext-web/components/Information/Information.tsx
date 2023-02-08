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
import EmptyNotice from "../EmptyNotice/EmptyNotice";
import EditorDescriptor from "../EditorDescriptor/EditorDescriptor";

const Information: React.FC<InformationProps> = ({
  documentId = "",
  documentData = null,
}) => {
  const [{ editorRecentText, editorDescriptor }, dispatch] = useEditorContext();
  const debouncedDescriptor = useDebounce(editorDescriptor, 500);
  const debouncedRecentText = useDebounce(editorRecentText, 500);

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
          (debouncedRecentText && debouncedRecentText !== ""))
      ) {
        // const fullText = debouncedPlaintext;
        const descriptor =
          typeof debouncedDescriptor !== "undefined" && debouncedDescriptor
            ? debouncedDescriptor
            : "";
        // const recentText = debouncedPlaintext.substring(
        //   debouncedPlaintext.length - 35
        // );

        console.info("searching", debouncedDescriptor, debouncedRecentText);

        setIsSearching(true);
        request(searchUrl, searchQuery, {
          // contextQuery: fullText,
          contextQuery: descriptor,
          query: debouncedRecentText,
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
    [debouncedRecentText, debouncedDescriptor] // Only call effect if debounced search term changes
  );

  return (
    <section className={styles.information}>
      <div className={styles.informationInner}>
        {/* <DebugPanel resultData={resultData} /> */}
        {/* {debouncedRecentText} */}

        {/* <h2>Information</h2> */}

        <EditorDescriptor documentData={documentData} />

        {isSearching ? <Loader /> : <></>}

        <section className={styles.informationResults}>
          <div className={styles.informationResultsInner}>
            {resultData?.results && resultData?.results.length > 0 ? (
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
              <EmptyNotice message="Continue typing or adjust the descriptor field" />
            )}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Information;

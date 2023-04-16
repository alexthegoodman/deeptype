import * as React from "react";

import styles from "./Suggestions.module.scss";

import { SuggestionsProps } from "./Suggestions.d";
import { useDebounce } from "../../hooks/useDebounce";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import { scoringUrl } from "../../defs/urls";
import Loader from "../Loader/Loader";
import BasicCard from "../BasicCard/BasicCard";

const Suggestions: React.FC<SuggestionsProps> = () => {
  const [{ editorPlaintext }, dispatch] = useEditorContext();
  const debouncedPlaintext = useDebounce(editorPlaintext, 500);

  const [isSearching, setIsSearching] = React.useState(false);
  const [text1, setText1] = React.useState<string | null>(null);
  const [text2, setText2] = React.useState<string | null>(null);
  const [text3, setText3] = React.useState<string | null>(null);

  const recentText = debouncedPlaintext.substring(
    debouncedPlaintext.length - 500
  );

  React.useEffect(
    () => {
      if (!isSearching && debouncedPlaintext && debouncedPlaintext !== "") {
        const body = JSON.stringify({ text: recentText });

        console.info("generating", recentText);

        setIsSearching(true);
        fetch(scoringUrl + "/generator", { method: "POST", body }).then(
          async (data) => {
            const json = await data.json();
            const generatedText1 = json[0].generated_text;
            setText1(generatedText1);

            fetch(scoringUrl + "/generator", { method: "POST", body }).then(
              async (data) => {
                const json = await data.json();
                const generatedText2 = json[0].generated_text;
                setText2(generatedText2);

                fetch(scoringUrl + "/generator", { method: "POST", body }).then(
                  async (data) => {
                    const json = await data.json();
                    const generatedText3 = json[0].generated_text;
                    setIsSearching(false);
                    setText3(generatedText3);
                  }
                );
              }
            );
          }
        );
      } else {
        setText1(null);
        setText2(null);
        setText3(null);
        setIsSearching(false);
      }
    },
    [debouncedPlaintext] // Only call effect if debounced search term changes
  );

  const loader = isSearching ? <Loader /> : <></>;

  const text1Parts = text1 ? text1?.split(recentText) : [];
  const text2Parts = text2 ? text2?.split(recentText) : [];
  const text3Parts = text3 ? text3?.split(recentText) : [];

  // console.info("text1Parts", text1, "recentText", recentText, text1Parts);

  const displayText1 = (
    <>
      <em>{recentText}</em>
      {text1Parts[1]}
    </>
  );
  const displayText2 = (
    <>
      {/* <em>{recentText}</em> */}
      {text2Parts[1]}
    </>
  );
  const displayText3 = (
    <>
      {/* <em>{recentText}</em> */}
      {text3Parts[1]}
    </>
  );

  console.info("render suggestions");

  return (
    <section className={styles.suggestions}>
      <div className={styles.suggestionsInner}>
        {loader}
        {text1 ? (
          <BasicCard
            header={<span>Suggestion</span>}
            body={<p>{displayText1}</p>}
          />
        ) : (
          <></>
        )}
        {text2 ? (
          <BasicCard
            header={<span>Suggestion</span>}
            body={<p>{displayText2}</p>}
          />
        ) : (
          <></>
        )}
        {text3 ? (
          <BasicCard
            header={<span>Suggestion</span>}
            body={<p>{displayText3}</p>}
          />
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default Suggestions;

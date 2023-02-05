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
    debouncedPlaintext.length - 140
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

  return (
    <section className={styles.suggestions}>
      <div className={styles.suggestionsInner}>
        {text1 ? (
          <BasicCard header={<span>Suggestion</span>} body={<p>{text1}</p>} />
        ) : (
          <></>
        )}
        {text2 ? (
          <BasicCard header={<span>Suggestion</span>} body={<p>{text2}</p>} />
        ) : (
          <></>
        )}
        {text3 ? (
          <BasicCard header={<span>Suggestion</span>} body={<p>{text3}</p>} />
        ) : (
          <></>
        )}
        {loader}
      </div>
    </section>
  );
};

export default Suggestions;

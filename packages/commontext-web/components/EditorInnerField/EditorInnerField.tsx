"use client";
import "client-only";

import * as React from "react";

import styles from "./EditorInnerField.module.scss";

import "react-quill/dist/quill.snow.css";

import { EditorInnerFieldProps } from "./EditorInnerField.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import { Noto_Sans } from "@next/font/google";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

const CustomToolbar = () => (
  <div className={styles.toolbar} id="toolbar">
    <button className={`${styles.qlBold} ql-header`} value="1"></button>
    <button className={`${styles.qlBold} ql-bold`}></button>
    <button className={`${styles.qlItalic} ql-italic`}></button>
    <button className={`${styles.qlList} ql-list`} value="ordered"></button>
    <button className={`${styles.qlList} ql-list`} value="bullet"></button>
    <button className={`${styles.qlLink} ql-link`} value="button"></button>
  </div>
);

const EditorInnerField: React.FC<EditorInnerFieldProps> = ({
  Quill = null,
  ReactQuill = null,
}) => {
  console.info("Quill", Quill.default);
  var icons = Quill.default.import("ui/icons");
  console.info("icons", icons);
  icons["bold"] = `<i class="ph-text-bolder-thin"></i>`;
  icons["italic"] = `<i class="ph-text-italic-thin"></i>`;
  icons["header"] = `<i class="ph-text-h-one-thin"></i>`;
  icons["list"]["bullet"] = `<i class="ph-list-bullets-thin"></i>`;
  icons["list"]["ordered"] = `<i class="ph-list-numbers-thin"></i>`;
  icons["link"] = `<i class="ph-link-thin"></i>`;

  const editorRef = React.useRef();
  const [{ editorPlaintext }, dispatch] = useEditorContext();

  const totalWords = editorPlaintext
    ? editorPlaintext.match(/(\w+)/g)?.length
    : 0;

  const onFieldChange = (html: any, delta: any) => {
    const plaintext = html.replace(/<(.|\n)*?>/g, "");

    dispatch({ type: "editorValue", payload: html });
    dispatch({ type: "editorJson", payload: delta });
    dispatch({ type: "editorPlaintext", payload: plaintext });
  };

  React.useEffect(() => {
    console.info("editorRef", editorRef.current);
    editorRef.current.focus();
  }, [editorRef.current]);

  return (
    <>
      <section className={styles.quillField}>
        <div className={styles.quillFieldInner}>
          <section className={styles.toolbarWrapper}>
            <CustomToolbar />
            <div className={styles.counter}>
              <span>{totalWords} Words</span>
              <span>{editorPlaintext.length} Characters</span>
            </div>
          </section>

          <ReactQuill.default
            ref={editorRef}
            className={notoSans.className}
            theme="snow"
            onChange={onFieldChange}
            modules={{
              toolbar: {
                container: "#toolbar",
              },
            }}
            placeholder="Begin typing here..."
          />
        </div>
      </section>
    </>
  );
};

export default EditorInnerField;

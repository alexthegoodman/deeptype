"use client";
import "client-only";

import * as React from "react";

import styles from "./EditorInnerField.module.scss";

import "react-quill/dist/quill.snow.css";

import { EditorInnerFieldProps } from "./EditorInnerField.d";
import { useEditorContext } from "../../context/EditorContext/EditorContext";
import { Noto_Sans } from "@next/font/google";
import EditorDescriptor from "../EditorDescriptor/EditorDescriptor";
import FocusModeButton from "../FocusModeButton/FocusModeButton";
import EditorHeader from "../EditorHeader/EditorHeader";

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

const formats = [
  // 'background',
  "bold",
  "color",
  "font",
  "code",
  "italic",
  "link",
  "size",
  "strike",
  "script",
  "underline",
  "blockquote",
  "header",
  "indent",
  "list",
  "align",
  "direction",
  "code-block",
  "formula",
  // 'image' // disallowed
  // 'video' // disallowed
];

const EditorInnerField: React.FC<EditorInnerFieldProps> = ({
  Quill = null,
  ReactQuill = null,
  documentId = "",
  documentData = null,
  refetch = () => console.info("refetch"),
}) => {
  // console.info("Quill", Quill.default);
  var icons = Quill.default.import("ui/icons");
  // console.info("icons", icons);
  icons["bold"] = `<i class="ph-text-bolder-thin"></i>`;
  icons["italic"] = `<i class="ph-text-italic-thin"></i>`;
  icons["header"] = `<i class="ph-text-h-one-thin"></i>`;
  icons["list"]["bullet"] = `<i class="ph-list-bullets-thin"></i>`;
  icons["list"]["ordered"] = `<i class="ph-list-numbers-thin"></i>`;
  icons["link"] = `<i class="ph-link-thin"></i>`;

  const recentTextLength = 35;

  const editorRef = React.useRef<any>();

  const [{ editorPlaintext, focusModeEnabled }, dispatch] = useEditorContext();

  const totalWords = editorPlaintext
    ? editorPlaintext.match(/(\w+)/g)?.length
    : 0;

  const onFieldChange = (html: any, delta: any, x: any, instance: any) => {
    console.info("field change", html, delta, instance.getSelection());

    const selectionData = instance.getSelection();

    if (selectionData) {
      const plaintext = html.replace(/<(.|\n)*?>/g, "");

      const recentText = instance.getText(
        selectionData.index - recentTextLength,
        recentTextLength
      );

      dispatch({ type: "editorValue", payload: html });
      dispatch({ type: "editorJson", payload: instance.getContents() });
      dispatch({ type: "editorPlaintext", payload: plaintext });
      dispatch({
        type: "editorRecentText",
        payload: recentText,
      });

      // refetch(); // need to refetch after doc update, not on field change
    }
  };

  React.useEffect(() => {
    console.info("editorRef", editorRef.current);
    if (typeof editorRef.current !== "undefined") {
      const elem = editorRef.current as any;
      const quill = elem.getEditor();

      // elem.focus();

      // quill.on("text-change", function (delta, oldDelta, source) {
      //   console.info("text change", delta, oldDelta, source);
      // });

      quill.on("selection-change", function (range, oldRange, source) {
        if (range) {
          if (range.length === 0) {
            const recentText = quill.getText(
              range.index - recentTextLength,
              recentTextLength
            );

            console.log("User cursor is on", range.index, recentText);

            dispatch({ type: "editorRecentText", payload: recentText });
          } else {
            // var text = quill.getText(range.index, range.length);
            // console.log('User has highlighted', text);
          }
        } else {
          // console.log('Cursor not in the editor');
        }
      });

      return () => {
        quill.off("selection-change");
      };
    }
  }, [editorRef.current]);

  React.useEffect(() => {
    console.info("documentData?.content", documentData?.content);
  }, [documentData?.content]);

  return (
    <>
      <section
        className={`${styles.quillField} ${
          focusModeEnabled ? styles.focusMode : ""
        }`}
      >
        <div className={styles.quillFieldInner}>
          <section className={styles.descriptorWrapper}>
            <EditorHeader
              documentId={documentId}
              documentData={documentData}
              refetchDocument={refetch}
            />
            <FocusModeButton />
          </section>

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
            defaultValue={documentData?.content}
            formats={formats}
          />
        </div>
      </section>
    </>
  );
};

export default EditorInnerField;

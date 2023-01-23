import React, { useState, useReducer, Dispatch } from "react";

export interface EditorContextState {
  editorTitle: string;
  editorValue: string;
  editorJson: any;
  editorPlaintext: string;
}

export const EditorContextState = { editorTitle: "", editorValue: "", editorJson: null, editorPlaintext: "" };

export const EditorContextReducer = (
  state: EditorContextState,
  action: any
) => {
  switch (action.type) {
    // case value:
    //   break;

    default:
      return {
        ...state,
        [action.type]: action.payload,
      };
      break;
  }
};

export const EditorContext = React.createContext<
  [EditorContextState, Dispatch<any>]
>([EditorContextState, () => undefined]);

export const useEditorContext = () =>
  React.useContext(EditorContext) as unknown as Iterable<any>;

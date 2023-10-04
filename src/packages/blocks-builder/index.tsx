import React from "react";
import { CodeProvider } from "./providors/code";
import { Editor } from "./components/editor";
const BlocksEditor = () => {
  return (
    <CodeProvider>
      <Editor />
    </CodeProvider>
  );
};

export default BlocksEditor;
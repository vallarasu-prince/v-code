import React from "react";
import { CodeProvider } from "./providors/code";
import { Editor } from "./components/editor";

const BlocksEditor = () => {

  const onSaveBlocks = async (params: any) => {
    console.log("🚀 ~ file: index.tsx:10 ~ onSaveBlocks ~ params:", params);
  };

  return (
    <div>
      <CodeProvider>
        <Editor onSaveBlocks={onSaveBlocks} />
      </CodeProvider>
    </div>
  );
};

export default BlocksEditor;

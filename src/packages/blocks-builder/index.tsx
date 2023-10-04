import React from "react";
import { CodeProvider } from "./providors/code";
import { Editor } from "./components/editor";
import { Typography } from "antd";
const BlocksEditor = () => {
  return (
    <div>
      <CodeProvider>
        <header>
          <Typography.Title>V Code</Typography.Title>
        </header>

        <Editor />
      </CodeProvider>
    </div>
  );
};

export default BlocksEditor;

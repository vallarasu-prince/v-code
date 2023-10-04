import React from "react";
import { CodeProvider } from "./providors/code";
import { Editor } from "./components/editor";
import { Typography } from "antd";
const BlocksEditor = () => {
  return (
    <div>
      <CodeProvider>
        <header>
          <h2>V Code</h2>
        </header>

        <Editor />
      </CodeProvider>
    </div>
  );
};

export default BlocksEditor;

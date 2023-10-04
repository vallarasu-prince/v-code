import React from "react";
import { CodeProvider } from "./providors/code";
import { Editor } from "./components/editor";
import { Typography } from "antd";
const BlocksEditor = () => {
  return (
    <div>
      <CodeProvider>
        <header
          style={{
            position: "sticky",
            top: 0,
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(0.5px)",
          }}
        >
          <h2
            style={{
              margin: 0, // Remove default margin for the h2 element
              padding: 10,
              fontSize: "1.5rem", // Set font size
              transition: "color 0.3s ease-in-out", // Add transition effect for color change
              cursor: "pointer", // Add a pointer cursor for interaction
            }}
          >
            {`{ } V Code`}
          </h2>
        </header>

        <Editor />
      </CodeProvider>
    </div>
  );
};

export default BlocksEditor;

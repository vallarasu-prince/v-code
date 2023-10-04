import { Layout } from "antd";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Canvas from "./canvas";
import SidePanel from "./SidePanel";
import { CodeProvider, useCode } from "../providors/code";

interface EditorGridProps {
  children?: React.ReactNode;
}

const EditorGrid: React.FC<EditorGridProps> = (props) => (
  <div
    style={{
      height: "100vh",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "1fr 400px",
    }}
    {...props}
  />
);

export const Editor: React.FC = (props: any) => {
  const { onDragEnd, onBeforeDragStart, blocks, setCodeItems } = useCode();
  console.log("🚀 ~ file: editor.tsx:26 ~ useCode:", useCode());

  return (
    <CodeProvider>
      <Layout>
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={onBeforeDragStart}
        >
          <EditorGrid>
            <Canvas items={blocks} onSortItems={setCodeItems} />
            <SidePanel />
          </EditorGrid>
        </DragDropContext>
      </Layout>
    </CodeProvider>
  );
};

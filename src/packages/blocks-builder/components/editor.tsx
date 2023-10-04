import { Layout } from "antd";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Canvas from "./canvas";
import SidePanel from "./sidePanel";
import { CodeProvider, useCode } from "../providors/code";

interface EditorGridProps {
  children?: React.ReactNode;
}

const EditorGrid: React.FC<EditorGridProps> = (props) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 400px",
    }}
    {...props}
  />
);

export const Editor: React.FC = (props: any) => {
  const { onDragEnd, onBeforeDragStart, blocks, setCodeItems } = useCode();

  return (
    <CodeProvider>
      <Layout>
        <DragDropContext
          onDragEnd={onDragEnd}
          onBeforeDragStart={onBeforeDragStart}
        >
          <EditorGrid>
            <Canvas
              items={blocks}
              onSortItems={setCodeItems}
              onDragEnd={onDragEnd}
            />
            <SidePanel />
          </EditorGrid>
        </DragDropContext>
      </Layout>
    </CodeProvider>
  );
};

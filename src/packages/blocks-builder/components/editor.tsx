import { Layout } from "antd";
import React, { useState } from "react";
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
  console.log("🚀 ~ file: editor.tsx:24 ~ useCode:", useCode())

  const [isDropDisabled, setIsDropDisabled] = useState(false);
  console.log("🚀 ~ file: editor.tsx:26 ~ isDropDisabled:", isDropDisabled)

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
              isDropDisabled={isDropDisabled}
            />
            <SidePanel setIsDropDisabled={setIsDropDisabled} />
          </EditorGrid>
        </DragDropContext>
      </Layout>
    </CodeProvider>
  );
};

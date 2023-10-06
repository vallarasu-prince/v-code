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
  const {
    onDragEnd,
    onBeforeDragStart,
    blocks,
    setCodeItems,
    handleDeleteItem,
    handleDuplicateItem,
  } = useCode();

  const [isDropDisabled, setIsDropDisabled] = useState(false);

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
              handleDeleteItem={handleDeleteItem}
              handleDuplicateItem={handleDuplicateItem}
            />
            <SidePanel setIsDropDisabled={setIsDropDisabled} />
          </EditorGrid>
        </DragDropContext>
      </Layout>
    </CodeProvider>
  );
};

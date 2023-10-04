// SidePanel.tsx
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { blockItems } from "./blocks";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import { Tabs, TabsProps } from "antd";

export const DraggableComponent = ({ id, index, type, children }: any) => {
  return (
    <Draggable key={type} draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={type}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Templates",
    children: (
      <>
        <Droppable droppableId="components" direction="vertical">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                padding: 8,
                backgroundColor: "#f0f0f0",
                width: "100%",
                height: "100%",
              }}
            >
              {blockItems?.map(
                ({ id, type, props }: BlockItem, index: number) => (
                  <DraggableComponent
                    key={id}
                    id={id}
                    type={type}
                    index={index}
                  >
                    <div>
                      {renderBlockPreview({
                        type,
                        props,
                        id,
                      })}
                    </div>
                  </DraggableComponent>
                )
              )}
            </div>
          )}
        </Droppable>
      </>
    ),
  },
  {
    key: "2",
    label: "Components",
    children: (
      <>
        <h2>Coming Soon..</h2>
      </>
    ),
  },
];

const SidePanel: React.FC = () => {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default SidePanel;

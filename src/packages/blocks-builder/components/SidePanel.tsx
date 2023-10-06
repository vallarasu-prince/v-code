// SidePanel.tsx
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { blockItems } from "./blocks";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import { Tabs, TabsProps } from "antd";

export const DraggableComponent: any = ({ id, index, children }: any) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};

export const components = [
  {
    id: "2090",
    type: "Img",
    props: {
      backgroundImage:
        "https://img.freepik.com/free-photo/vintage-grunge-blue-concrete-texture-wall-background-with-vignette_1258-28373.jpg?w=996&t=st=1696414061~exp=1696414661~hmac=a1e77ba70fdd240cc1f02ecb0cef6a25c5fd8ab408779631612c62b05716169d",
      justifyContent: "space-between",
    },
  },
];

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
                ({ id, type, props, children }: any, index: number) => (
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
                        children,
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
              {components?.map(
                ({ id, type, props, children }: any, index: number) => (
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
                        children,
                      })}
                    </div>
                  </DraggableComponent>
                )
              )}
              hi
            </div>
          )}
        </Droppable>
      </>
    ),
  },
];

const SidePanel = (props: any) => {
  return (
    <div
      style={{
        background: "white",
        padding: 20,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(e) => {
          if (e === "2") {
            props?.setIsDropDisabled(true);
          } else props?.setIsDropDisabled(false);
        }}
      />
    </div>
  );
};

export default SidePanel;

// SidePanel.tsx
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { blockItems } from "./blocks";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import { Tabs, TabsProps } from "antd";
import { components } from "./components";

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

const onElementSelected: any = () => {};

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
                      {renderBlockPreview(
                        {
                          type,
                          props,
                          id,
                          children,
                          ptype: "sidepanel",
                        },
                        onElementSelected
                      )}
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
                // padding: 8,
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
                      {renderBlockPreview(
                        {
                          type,
                          props,
                          id,
                          children,
                          ptype: "sidepanel",
                        },
                        onElementSelected
                      )}
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

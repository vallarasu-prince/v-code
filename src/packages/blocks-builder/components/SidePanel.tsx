// SidePanel.tsx
import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { blockItems } from "./blocks";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";



export const DraggableComponent = ({ id, index, children }: any) => {
  return (
    <Draggable draggableId={id} index={index}>
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

const SidePanel: React.FC = () => {
  return (
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
          {blockItems?.map(({ id, type, props }: BlockItem, index: number) => (
            <DraggableComponent key={id} id={id} index={index}>
              <div>
                {renderBlockPreview({
                  type,
                  props,
                  id,
                })}
                <div>{type}</div>
              </div>
            </DraggableComponent>
          ))}
        </div>
      )}
    </Droppable>
  );
};

export default SidePanel;

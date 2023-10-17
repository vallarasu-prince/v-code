import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import { Drawer, Form, Input, Button, Divider, Row, Col, Card } from "antd";
import { DraggableComponent } from "./sidePanel";
import {
  Drop,
  EditHoverWrapper,
  EditProps,
  EmptyCard,
  InlineBlockRender,
} from "../common";

const Canvas = ({
  blocks,
  isDropDisabled,
  onElementSelected,
  handleStartEditing,
}: any) => {
  return (
    <>
      <Drop
        id="canvas"
        type="droppable-category"
        isDropDisabled={isDropDisabled}
      >
        {blocks?.map((block: BlockItem, blockIdx: number) => (
          <div>
            <DraggableComponent key={block.id} id={block.id} index={blockIdx}>
              <Drop key={block.id} id={block.id} type="droppable-item">
                <EditHoverWrapper
                  handleStartEditing={handleStartEditing}
                  onElementSelected={onElementSelected}
                  item={block}
                  type="parent"
                >
                  <InlineBlockRender
                    block={block}
                    handleStartEditing={handleStartEditing}
                    onElementSelected={onElementSelected}
                    items={block?.items}
                  />
                </EditHoverWrapper>
              </Drop>
            </DraggableComponent>
          </div>
        ))}
      </Drop>
    </>
  );
};

export default Canvas;

import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { renderBlockPreview } from "../components/block-preview";
import { Col, Row } from "antd";
import { useCode } from "../providors/code";
import { DraggableComponent } from "../components/sidePanel";
import { EditHoverWrapper, EditProps } from "../common";

const RowComponent = (props: any) => {
  const {
    id,
    children,
    onElementSelected,
    ptype = "",
    handleDeleteItem,
    handleDuplicateItem,
    onSortItems,
    editableItemIndex,
    items,
    index,
  } = props;

  return (
    <ComponentDroppable>
      <Row gutter={[16, 16]}>
        {children?.map((item: any, idx: number) => (
          <Col span={12} key={item.id}>
            <EditHoverWrapper
              item={item}
              items={children}
              onElementSelected={onElementSelected}
              handleDeleteItem={handleDeleteItem}
              handleDuplicateItem={handleDuplicateItem}
              editableItemIndex={editableItemIndex}
              onSortItems={onSortItems}
              ptype={ptype}
              pitems={items}
              index={index}
            >
              {/* <DraggableComponent key={item.id} id={item.id} index={index}> */}
              {/* {renderBlockPreview(item)} */}
              {/* </DraggableComponent> */}
            </EditHoverWrapper>
          </Col>
        ))}
      </Row>
    </ComponentDroppable>
  );
};

export default RowComponent;

const ComponentDroppable = (props: any) => {
  const { children } = props;

  return (
    <Droppable droppableId="canvas1" direction="vertical">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: "#e0e0e0",
            width: "100%",
          }}
        >
          {children}
        </div>
      )}
    </Droppable>
  );
};

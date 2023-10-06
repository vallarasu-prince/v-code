import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DraggableComponent } from "../blocks-builder/components/sidePanel";
import { renderBlockPreview } from "../blocks-builder/components/block-preview";
import { Col, Row } from "antd";

const RowComponent = ({ id, index, children }: any) => {
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
          <Row gutter={[16, 16]}>
            {children?.map((item: any, index: number) => (
              <Col span={12} key={item.id}>
                <div>{renderBlockPreview(item)}</div>
              </Col>
            ))}
          </Row>
       </div>
      )}
    </Droppable>
  );
};

export default RowComponent;

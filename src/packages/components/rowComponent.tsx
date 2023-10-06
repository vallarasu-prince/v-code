import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { DraggableComponent } from "../blocks-builder/components/sidePanel";
import { renderBlockPreview } from "../blocks-builder/components/block-preview";
import { Col, Row } from "antd";
import { EditProps } from "../blocks-builder/components/canvas";

const RowComponent = (props: any) => {
  const { id, index, children, onElementSelected, ptype = "" } = props;
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [editableItemId, setEditableItemId] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const [elementStyle, setElementStyle] = useState({});

  const onHover = (itemId: string) => {
    setHoveredItemId(itemId);
    if (ptype !== "sidepanel") {
      setElementStyle({ padding: 2 });
    }
    onElementSelected(() => {
      return true;
    });
  };

  const onHoverLeave = (itemId: string) => {
    setHoveredItemId(null);
    setElementStyle({});
    onElementSelected(() => {
      return false;
    });
  };
  const handleOpenDrawer = (itemId: string) => {
    setHoveredItemId(itemId);
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setEditableItemId(null);
  };

  const handleEditProps = (newProps: any) => {
    const editedItemIndex = children.findIndex(
      (item: any) => item.id === editableItemId
    );
    const updatedItem = { ...children[editedItemIndex], props: newProps };
    const updatedItems = [...children];
    updatedItems[editedItemIndex] = updatedItem;
    // onSortItems(updatedItems);
    handleCloseDrawer();
  };

  const handleStartEditing = (itemId: string) => {
    if (ptype !== "sidepanel") {
      setEditableItemId(itemId);
      handleOpenDrawer(itemId);
    }
  };

  const handleFinishEditing = () => {
    setEditableItemId(null);
    handleCloseDrawer();
  };

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
          {/* <Row gutter={[16, 16]}>
            {children?.map((item: any, index: number) => (
              <Col span={12} key={item.id}>
                <div>{renderBlockPreview(item)}</div>

                
              </Col>
            ))}
          </Row> */}
          {/* <Row gutter={[16, 16]}>
            {children?.map((item: any, index: number) => (
              // <DraggableComponent key={item.id} id={item.id} index={index}>
              <Col span={12} key={item.id}>
                <div
                  style={{
                    border:
                      hoveredItemId === item.id ? "2px solid blue" : undefined,
                    ...(hoveredItemId === item.id && elementStyle),
                  }}
                  onMouseOver={() => onHover(item.id)}
                  onMouseLeave={() => onHoverLeave(item.id)}
                  onClick={() => handleStartEditing(item.id)}
                >
                  {renderBlockPreview(item, onElementSelected)}
                </div>
              </Col>
              // </DraggableComponent>
            ))}
          </Row> */}

          <Row gutter={[16, 16]}>
            {children?.map((item: any, index: number) => (
              <Col span={12} key={item.id}>
                <div
                  style={{
                    border:
                      hoveredItemId === item.id ? "2px solid blue" : undefined,
                    ...(hoveredItemId === item.id && elementStyle),
                  }}
                  onMouseOver={() => onHover(item.id)}
                  onMouseLeave={() => onHoverLeave(item.id)}
                  onClick={() => handleStartEditing(item.id)}
                >
                  {renderBlockPreview(item, onElementSelected)}
                </div>
              </Col>
            ))}
          </Row>

          <EditProps
            handleCloseDrawer={handleCloseDrawer}
            drawerVisible={drawerVisible}
            editableItemId={editableItemId}
            handleEditProps={handleEditProps}
            handleFinishEditing={handleFinishEditing}
            items={children}
          />
        </div>
      )}
    </Droppable>
  );
};

export default RowComponent;

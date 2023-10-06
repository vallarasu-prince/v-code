import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import { Drawer, Form, Input, Button } from "antd";
import { DraggableComponent } from "./sidePanel";

interface CanvasProps {
  items: BlockItem[];
  onSortItems: (updatedItems: BlockItem[]) => void;
  onDragEnd: (updatedItems: any) => void;
}

const Canvas = ({ items, onSortItems, isDropDisabled }: any) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [editableItemId, setEditableItemId] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const [elementStyle, setElementStyle] = useState({});

  const onHover = (itemId: string) => {
    setHoveredItemId(itemId);
    // setElementStyle({ padding: 2 });
  };

  const onHoverLeave = (itemId: string) => {
    setHoveredItemId(null);
    setElementStyle({});
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
    const editedItemIndex = items.findIndex(
      (item: any) => item.id === editableItemId
    );
    const updatedItem = { ...items[editedItemIndex], props: newProps };
    const updatedItems = [...items];
    updatedItems[editedItemIndex] = updatedItem;
    onSortItems(updatedItems);
    handleCloseDrawer();
  };

  const handleStartEditing = (itemId: string) => {
    setEditableItemId(itemId);
    handleOpenDrawer(itemId);
  };

  const handleFinishEditing = () => {
    setEditableItemId(null);
    handleCloseDrawer();
  };

  return (
    <Droppable
      isDropDisabled={isDropDisabled}
      droppableId="canvas"
      direction="vertical"
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            padding: 8,
            backgroundColor: "#e0e0e0",
            width: "100%",
            height: "100vh",
            overflow: "auto",
          }}
        >
          {items?.map((item: BlockItem, index: number) => (
            <DraggableComponent key={item.id} id={item.id} index={index}>
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
                {renderBlockPreview(item)}
              </div>
            </DraggableComponent>
          ))}

          <EditProps
            handleCloseDrawer={handleCloseDrawer}
            drawerVisible={drawerVisible}
            editableItemId={editableItemId}
            handleEditProps={handleEditProps}
            handleFinishEditing={handleFinishEditing}
            items={items}
          />
        </div>
      )}
    </Droppable>
  );
};

export default Canvas;

export const EditProps = (props: any) => {
  const {
    handleCloseDrawer,
    drawerVisible,
    editableItemId,
    handleEditProps,
    handleFinishEditing,
    items,
  } = props;

  return (
    <>
      <Drawer
        title="Edit Props"
        placement="right"
        closable={false}
        onClose={handleCloseDrawer}
        visible={drawerVisible}
        width={400}
      >
        {editableItemId && (
          <Form
            onFinish={(newProps) => {
              handleEditProps(newProps);
              handleFinishEditing();
            }}
            initialValues={
              items.find((item: any) => item.id === editableItemId)?.props
            }
          >
            {Object.entries(
              items.find((item: any) => item.id === editableItemId)?.props || {}
            ).map(([key, value]) => (
              <Form.Item key={key} label={key} name={key}>
                <Input />
              </Form.Item>
            ))}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </>
  );
};

import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import { Drawer, Form, Input, Button } from "antd";
import { DraggableComponent } from "./SidePanel";

interface CanvasProps {
  items: BlockItem[];
  onSortItems: (updatedItems: BlockItem[]) => void;
  onDragEnd: (updatedItems: any) => void;
}

const Canvas: React.FC<CanvasProps> = ({ items, onSortItems }) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [editableItemId, setEditableItemId] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const handleHover = (itemId: string) => {
    // setHoveredItemId(itemId);
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
      (item) => item.id === editableItemId
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
    <Droppable droppableId="canvas" direction="vertical">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            padding: 8,
            backgroundColor: "#e0e0e0",
            width: "100%",
            height: "100%",
          }}
        >
          {items?.map((item: BlockItem, index: number) => (
            <DraggableComponent key={item.id} id={item.id} index={index}>
              <div
                style={{
                  userSelect: "none",
                  width: "100%",
                  border: hoveredItemId === item.id ? "1px solid red" : undefined,
                }}
                onClick={() => handleStartEditing(item.id)}
              >
                <div>{renderBlockPreview(item)}</div>
              </div>
            </DraggableComponent>
          ))}

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
                  items.find((item) => item.id === editableItemId)?.props
                }
              >
                {Object.entries(
                  items.find((item) => item.id === editableItemId)?.props || {}
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
        </div>
      )}
    </Droppable>
  );
};

export default Canvas;

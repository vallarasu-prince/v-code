import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import { Drawer, Form, Input, Button } from "antd";

interface CanvasProps {
  items: BlockItem[];
  onSortItems: (updatedItems: BlockItem[]) => void;
}

const Canvas: React.FC<CanvasProps> = ({ items, onSortItems }) => {
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [editableItemId, setEditableItemId] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const updatedItems = Array.from(items);
    const [removed] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, removed);

    // Call the parent component's onSortItems to update the state
    onSortItems(updatedItems);
  };

  const handleHover = (itemId: string) => {
    setHoveredItemId(itemId);
  };

  const handleOpenDrawer = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setEditableItemId(null); // Reset editableItemId when closing drawer
  };

  const handleEditProps = (newProps: any) => {
    // Find the index of the item being edited
    const editedItemIndex = items.findIndex((item) => item.id === editableItemId);
  
    // Create a copy of the edited item with updated props
    const updatedItem = {
      ...items[editedItemIndex],
      props: newProps,
    };
  
    // Create a copy of the items array with the updated item
    const updatedItems = [...items];
    updatedItems[editedItemIndex] = updatedItem;
  
    // Call the parent component's onSortItems to update the state
    onSortItems(updatedItems);
  
    // Close the drawer
    handleCloseDrawer();
  };

  const handleStartEditing = (itemId: string) => {
    setEditableItemId(itemId);
    handleOpenDrawer();
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          {provided.placeholder}

          {items?.map((item: BlockItem, index: number) => (
            <div
              style={{
                userSelect: "none",
                width: "100%",
              }}
              onMouseEnter={() => handleHover(item.id)}
              onMouseLeave={() => handleHover("null")}
              onClick={() => handleStartEditing(item.id)}
            >
              <div>{renderBlockPreview(item)}</div>
            </div>
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
                {/* Render form fields based on the props structure */}
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

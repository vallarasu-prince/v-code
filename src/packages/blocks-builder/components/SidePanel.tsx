// SidePanel.tsx
import React, { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BlockItem } from "./types";
import { renderBlockPreview } from "./block-preview";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Tabs,
  TabsProps,
} from "antd";
import { components } from "./components";
import { blockItems } from "./blocks";
import { InlineBlockRender } from "../common";

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

const SidePanel = (props: any) => {
  const {
    finalItem,
    editableItemId,
    handleEditProps,
    handleFinishEditing,
    handleDeleteItem,
    handleDuplicateItem,
    editableItemIndex,
    elementType,
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(finalItem?.props);
  }, [finalItem?.id]);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Templates",
      children: (
        <div style={{ width: "100%", height: "100%" }}>
          <Droppable droppableId="components" direction="vertical">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  padding: 8,
                  width: "100%",
                  height: "100%",
                }}
              >
                {blockItems?.map(
                  ({ id, type, props, items }: any, index: number) => {
                    return (
                      <DraggableComponent
                        key={id}
                        id={id}
                        type={type}
                        index={index}
                      >
                        <InlineBlockRender items={items} ptype="sidepanel" />
                      </DraggableComponent>
                    );
                  }
                )}
              </div>
            )}
          </Droppable>
        </div>
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
                  (
                    { id, type, props, children }: any,
                    blockItemIdx: number
                  ) => (
                    <DraggableComponent
                      key={id}
                      id={id}
                      type={type}
                      index={blockItemIdx}
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
                          blockItemIdx
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
      key: "3",
      label: "Editor",
      children: (
        <>
          <Card
            title={editableItemId}
            extra={[
              <>
                <Button
                  onClick={() =>
                    handleDeleteItem(
                      editableItemId,
                      elementType,
                      editableItemIndex
                    )
                  }
                  danger
                >
                  Delete
                </Button>
                <Divider type="vertical" />
                <Button
                  onClick={() =>
                    handleDuplicateItem(
                      editableItemId,
                      elementType,
                      editableItemIndex
                    )
                  }
                >
                  Duplicate
                </Button>
              </>,
            ]}
          >
            {editableItemId && (
              <Form
                form={form}
                onFinish={(newProps) => {
                  handleEditProps(newProps);
                  handleFinishEditing();
                }}
              >
                {Object.entries(finalItem?.props).map(([key, value]) => (
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
          </Card>
        </>
      ),
    },
  ];

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
        defaultActiveKey={props?.editorIndex}
        activeKey={props?.editorIndex}
        items={items}
        onChange={(e) => {
          if (e === "2") {
            props?.setIsDropDisabled(true);
          } else props?.setIsDropDisabled(false);
          props?.setEditorIndex(e);
        }}
      />
    </div>
  );
};

export default SidePanel;

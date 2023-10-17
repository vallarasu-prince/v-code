import { Button, Card, Col, Drawer, Form, Input, Row } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { renderBlockPreview } from "./components/block-preview";
import { useState } from "react";
export const G_TITLE = "{ } V Code";

export const Drop = ({ id, type, ...props }: any) => {
  return (
    <Droppable droppableId={id} isDropDisabled={props?.isDropDisabled}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} {...props}>
            {props.children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export const EmptyCard = ({ items, blockItemIdx = 0 }: any) => {
  return (
    <>
      <Card
        style={{
          height: "150px",
          marginBottom: 10,
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Add Elements
      </Card>
    </>
  );
};

export const InlineBlockRender = ({
  block,
  items,
  type = "editor",
  ...props
}: any) => {
  return (
    <>
      {items.length <= 0 ? (
        <EmptyCard />
      ) : (
        <div>
          <Row gutter={[16, 16]} style={{...block?.props}}>
            {items?.map((item: any, blockItemIdx: any) => {
              return (
                <Col span={12} key={item.id}>
                  <EditHoverWrapper item={item} {...props}>
                    {renderBlockPreview(item, blockItemIdx)}
                  </EditHoverWrapper>
                </Col>
              );
            })}
          </Row>
        </div>
      )}
    </>
  );
};

export const BlocksPreviewRender = ({ blocks }: any) => {
  return (
    <>
      {blocks?.map((block: any) => {
        return <InlineBlockRender type="preview" items={block?.items} />;
      })}
    </>
  );
};

export const EditProps = (props: any) => {
  const {
    handleCloseDrawer,
    drawerVisible,
    editableItemId,
    handleDeleteItem = () => {},
    handleDuplicateItem = () => {},
    editableItemIndex,
    type,
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
        extra={
          <>
            <div></div>
          </>
        }
      ></Drawer>
    </>
  );
};

export const EditHoverWrapper = (props: any) => {
  const {
    children,
    onElementSelected = () => {},
    ptype,
    item,
    type="child",
    handleStartEditing = () => {},
  } = props;

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
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

  return (
    <>
      <div
        style={{
          border: hoveredItemId === item.id ? "2px solid blue" : undefined,
          ...(hoveredItemId === item.id && elementStyle),
        }}
        onMouseOver={() => onHover(item.id)}
        onMouseLeave={() => onHoverLeave(item.id)}
        onClick={(e) => {
          e.stopPropagation();
          handleStartEditing(item.id, item, type);
        }}
      >
        {children}
      </div>
    </>
  );
};

import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { renderBlockPreview } from "../components/block-preview";
import { Col, Row } from "antd";
import { EditProps } from "../components/canvas";
import { useCode } from "../providors/code";
import { DraggableComponent } from "../components/sidePanel";

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
                {renderBlockPreview(
                  items,
                  index,
                  item,
                  onElementSelected,
                  handleDeleteItem,
                  handleDuplicateItem,
                  onSortItems,
                  editableItemIndex
                )}
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

const EditHoverWrapper = (props: any) => {
  const {
    children,
    onElementSelected,
    ptype,
    item,
    handleDuplicateItem,
    handleDeleteItem,
    onSortItems,
    items,
    pitems,
    index,
  } = props;

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [editableItemId, setEditableItemId] = useState<string | null>(null);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [editableItemIndex, setEditableItemIndex] = useState<number | null>(
    null
  );

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
    const editedItemIndex = items.findIndex(
      (item: any) => item.id === editableItemId
    );
    const updatedItem = { ...items[editedItemIndex], props: newProps };
    pitems[index]["children"][editedItemIndex] = updatedItem;
    onSortItems(pitems);
    handleCloseDrawer();
  };

  const handleStartEditing = (itemId: string, idx: any) => {
    if (ptype !== "sidepanel") {
      setEditableItemId(itemId);
      setEditableItemIndex(idx);
      handleOpenDrawer(itemId);
    }
  };

  const handleFinishEditing = () => {
    setEditableItemId(null);
    handleCloseDrawer();
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
        onClick={() => handleStartEditing(item.id, item)}
      >
        {children}
      </div>
      <EditProps
        handleCloseDrawer={handleCloseDrawer}
        drawerVisible={drawerVisible}
        editableItemId={editableItemId}
        handleEditProps={handleEditProps}
        handleFinishEditing={handleFinishEditing}
        items={items}
        handleDeleteItem={handleDeleteItem}
        handleDuplicateItem={handleDuplicateItem}
        type="child"
      />
    </>
  );
};

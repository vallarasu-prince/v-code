import { Button, Card, Col, Divider, Drawer, Layout, Row } from "antd";
import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Canvas from "./canvas";
import SidePanel from "./sidePanel";
import { CodeProvider, useCode } from "../providors/code";
import { BlocksPreviewRender, G_TITLE, InlineBlockRender } from "../common";

const { Header } = Layout;
interface EditorGridProps {
  children?: React.ReactNode;
}

const EditorGrid: React.FC<EditorGridProps> = (props) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 400px",
    }}
    {...props}
  />
);

export const Editor = (props: any) => {
  const { onSaveBlocks } = props;
  const {
    onDragEnd,
    onBeforeDragStart,
    blocks,
    setCodeItems,
    handleDeleteItem,
    handleDuplicateItem,
    editorIndex,
    setEditorIndex,
  } = useCode();

  const [isDropDisabled, setIsDropDisabled] = useState(false);
  const [isVisible, setVisible] = useState(false);

  const [previewData, setPreviewData] = useState([]);

  const onOpenPreview = async (params: any) => {
    setVisible(true);
    setPreviewData(params);
  };
  const onClosePreview = async () => {
    setVisible(false);
    setPreviewData([]);
  };

  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [editableItemId, setEditableItemId] = useState<string | null>(null);
  const [editableItemIndex, setEditableItemIndex] = useState<number | null>(
    null
  );
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const [elementStyle, setElementStyle] = useState({});
  const [finalItem, setFinalItem] = useState({});

  const [isElementSelected, setIsElementSelected] = useState<boolean>(false);
  const [elementType, setElementType] = useState("");

  const onHover = (itemId: string) => {
    setHoveredItemId(itemId);
    // setElementStyle({ padding: 20 });
  };

  const onElementSelected = (value: any) => {
    setIsElementSelected(value);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setEditableItemId(null);
    setEditableItemIndex(null);
  };

  const handleEditProps = (newProps: any) => {
    if (elementType === "parent") {
      const editedItemIndex = blocks.findIndex(
        (item: any) => item.id === editableItemId
      );

      const updatedItem = { ...blocks[editedItemIndex], props: newProps };
      const updatedItems = [...blocks];
      updatedItems[editedItemIndex] = updatedItem;
      setCodeItems(updatedItems);
    } else {
      const updatedItems = blocks?.map((block: any) => {
        const updatedBlockItems = block?.items?.map((blockItem: any) => {
          if (editableItemId === blockItem.id) {
            return {
              ...blockItem,
              props: newProps,
            };
          }
          return blockItem;
        });

        return {
          ...block,
          items: updatedBlockItems,
        };
      });

      setCodeItems(updatedItems);
    }
  };

  const handleStartEditing = (itemId: string, item: any, type: string) => {
    setEditableItemId(itemId);
    setElementType(type);
    setFinalItem(item);
    setEditorIndex("3");
  };

  const handleFinishEditing = () => {
    setEditableItemId(null);
  };

  return (
    <CodeProvider>
      <Layout>
        <Card
          title={<h2>{G_TITLE}</h2>}
          extra={[
            <>
              <Button type="primary" onClick={() => onSaveBlocks(blocks)}>
                Save
              </Button>
              <Divider type="vertical" />
              <Button
                type="primary"
                onClick={() => {
                  onOpenPreview(blocks);
                }}
              >
                Preview
              </Button>
            </>,
          ]}
        >
          <Layout>
            <DragDropContext
              onDragEnd={onDragEnd}
              onBeforeDragStart={onBeforeDragStart}
            >
              <EditorGrid>
                <Canvas
                  blocks={blocks}
                  isDropDisabled={isDropDisabled}
                  handleStartEditing={handleStartEditing}
                  onElementSelected={onElementSelected}
                />
                <SidePanel
                  elementType={elementType}
                  setEditorIndex={setEditorIndex}
                  editorIndex={editorIndex}
                  setIsDropDisabled={setIsDropDisabled}
                  editableItemId={editableItemId}
                  handleEditProps={handleEditProps}
                  handleFinishEditing={handleFinishEditing}
                  finalItem={finalItem}
                  handleDeleteItem={handleDeleteItem}
                  handleDuplicateItem={handleDuplicateItem}
                />
              </EditorGrid>
            </DragDropContext>
          </Layout>
        </Card>

        <Drawer
          title="Preview"
          width="100%"
          visible={isVisible}
          onClose={onClosePreview}
        >
          <div>
            <BlocksPreviewRender blocks={previewData} />
          </div>
        </Drawer>
      </Layout>
    </CodeProvider>
  );
};

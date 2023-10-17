// codeContext.js
import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { components } from "../components/components";
import { blockItems } from "../components/blocks";

const CodeContext = createContext<any>({});

export const CodeProvider = ({ children }: any) => {
  const [editorIndex, setEditorIndex] = useState<any>("1");

  const [codeState, setCodeState] = useState<any>({
    blocks: [],
    items: [...blockItems, ...components],
  });

  const updateCodeState = (newState: any) => {
    setCodeState((prevState: any) => ({
      ...prevState,
      ...newState,
    }));
  };

  const onDragEnd = (dragResult: any) => {
    if (!dragResult.destination) {
      return;
    }

    const { source, destination, type, draggableId } = dragResult;

    // If the drag is within the "canvas"
    if (
      source.droppableId === "canvas" &&
      destination.droppableId === "canvas"
    ) {
      // Reorder the blocks within the canvas
      const updatedBlocks = Array.from(codeState.blocks);
      const [removed] = updatedBlocks.splice(source.index, 1);
      updatedBlocks.splice(destination.index, 0, removed);

      // Call the parent component's onSortItems to update the state
      updateCodeState({ blocks: updatedBlocks });
    }

    // If the drag is from "components" to "canvas"
    if (
      source.droppableId === "components" &&
      destination.droppableId === "canvas"
    ) {
      // Generate unique ID for the dragged item [draggableId]
      let foundTemplate = codeState.items.find(
        (item: any) => item.id === draggableId
      );

      if (foundTemplate?.items) {
        const foundTemplateChildren = foundTemplate?.items.map((child: any) => {
          return { ...child, id: uuidv4() };
        });

        foundTemplate = {
          ...foundTemplate,
          items: foundTemplateChildren,
        };
      }

      const draggedItem = {
        ...foundTemplate,
        id: uuidv4(),
      };

      // Add the dragged item to the canvas
      updateCodeState({
        blocks: [...codeState.blocks, draggedItem],
      });
    } else if (source.droppableId === "components" && destination.droppableId) {
      // Generate unique ID for the dragged item
      const foundComponent = codeState.items?.find(
        (item: any) => item.id === draggableId
      );

      const draggedItem = {
        ...foundComponent,
        id: uuidv4(),
      };

      // Find the index of the RowComponent in codeState.blocks
      const rowIndex = codeState.blocks.findIndex(
        (block: any) => block.id === destination.droppableId
      );

      // Check if the RowComponent exists
      if (rowIndex === -1) {
        console.error("RowComponent not found in codeState.blocks");
        return;
      }

      // Clone the RowComponent and update its children array
      const updatedRowComponent = {
        ...codeState.blocks[rowIndex],
        items: [
          ...(codeState.blocks[rowIndex]?.items.map((child: any) => {
            return { ...child, id: uuidv4() };
          }) || []),
          draggedItem,
        ],
      };

      // Update the state with the modified RowComponent
      updateCodeState({
        blocks: [
          ...codeState.blocks.slice(0, rowIndex), // Blocks before the RowComponent
          updatedRowComponent,
          ...codeState.blocks.slice(rowIndex + 1), // Blocks after the RowComponent
        ],
      });
    }
  };

  const setCodeItems = (values: any) => {
    // Generate unique IDs for new items
    const newItemsWithIds = values.map((item: any) => ({
      ...item,
      id: uuidv4(), // Add a new id property with a unique value
    }));

    // Replace the existing items with the new items
    updateCodeState({ blocks: newItemsWithIds });
  };

  const handleDeleteItem = (itemId: string, type: string) => {
    let updatedBlocks = [];

    if (type === "parent") {
      updatedBlocks = codeState.blocks.filter(
        (block: any) => block.id !== itemId
      );
    } else {
      updatedBlocks = codeState.blocks.map((block: any) => {
        if (block.items && block.items.length > 0) {
          const updatedChildren = block.items.filter(
            (child: any) => child.id !== itemId
          );
          return {
            ...block,
            items: updatedChildren,
          };
        }
        return block;
      });
    }

    setCodeItems(updatedBlocks);
  };

  const handleDuplicateItem = (itemId: string, type: string) => {
    const duplicatedBlock = codeState.blocks.find(
      (block: any) => block.id === itemId
    );

    let updatedBlocks = [...codeState.blocks];

    if (type === "parent") {
      updatedBlocks.push({
        ...duplicatedBlock,
        id: uuidv4(),
        items: [
          ...duplicatedBlock?.items.map((child: any) => {
            return { ...child, id: uuidv4() };
          }),
        ],
      });
    } else {
      updatedBlocks = updatedBlocks.map((block: any) => {
        if (block.items && block.items.length > 0) {
          const indexOfChild = block.items.find(
            (child: any) => child.id === itemId
          );
          const updatedChildren = [
            ...block.items.slice(indexOfChild + 1),
            { ...indexOfChild, id: uuidv4() },
          ];
          return { ...block, items: updatedChildren };
        }
        return block;
      });
    }
    setCodeItems(updatedBlocks);
  };

  const contextValue = {
    ...codeState,
    updateCodeState,
    onDragEnd,
    setCodeItems,
    handleDeleteItem,
    handleDuplicateItem,
    editorIndex,
    setEditorIndex,
  };

  return (
    <CodeContext.Provider value={contextValue}>{children}</CodeContext.Provider>
  );
};

export const useCode = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error("useCode must be used within a CodeProvider");
  }
  return context;
};

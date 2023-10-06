// codeContext.js
import React, { createContext, useContext, useState } from "react";
import { blockItems } from "../components/blocks";
import { v4 as uuidv4 } from "uuid";
import { components } from "../components/sidePanel";

const CodeContext = createContext<any>({});

export const CodeProvider = ({ children }: any) => {
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
    console.log("🚀 ~ file: code.tsx:22 ~ onDragEnd ~ dragResult:", dragResult);
    if (!dragResult.destination) {
      return;
    }

    const { source, destination, type, draggableId } = dragResult;
    console.log("🚀 ~ file: code.tsx:27 ~ onDragEnd ~ source:", source);

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
      const foundTemplate = codeState.items.find(
        (item: any) => item.id === draggableId
      );
      const draggedItem = {
        ...foundTemplate,
        id: uuidv4(),
      };

      // Add the dragged item to the canvas
      updateCodeState({
        blocks: [...codeState.blocks, draggedItem],
      });
    }
    if (
      source.droppableId === "components" &&
      destination.droppableId === "canvas1"
    ) {
      // Generate unique ID for the dragged item
      const foundComponent = codeState.items.find(
        (item: any) => item.id === draggableId
      );
      const draggedItem = {
        ...foundComponent,
        id: uuidv4(),
      };

      // Find the index of the RowComponent in codeState.blocks
      const rowIndex = codeState.blocks.findIndex(
        (block: any) => block.type === "RowComponent"
      );

      // Check if the RowComponent exists
      if (rowIndex === -1) {
        console.error("RowComponent not found in codeState.blocks");
        return;
      }

      // Clone the RowComponent and update its children array
      const updatedRowComponent = {
        ...codeState.blocks[rowIndex],
        children: [...(codeState.blocks[rowIndex].children || []), draggedItem],
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

  const contextValue = {
    ...codeState,
    updateCodeState,
    onDragEnd,
    setCodeItems,
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

// codeContext.js
import React, { createContext, useContext, useState } from "react";
import { blockItems } from "../components/blocks";
import { v4 as uuidv4 } from "uuid";

const CodeContext = createContext<any>({});

export const CodeProvider = ({ children }: any) => {
  const [codeState, setCodeState] = useState<any>({
    blocks: [],
    items: blockItems,
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

    const { source, destination, type } = dragResult;

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
      // Generate unique ID for the dragged item
      const draggedItem = {
        ...codeState.items[source.index],
        id: uuidv4(),
      };

      // Add the dragged item to the canvas
      updateCodeState({
        blocks: [...codeState.blocks, draggedItem],
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

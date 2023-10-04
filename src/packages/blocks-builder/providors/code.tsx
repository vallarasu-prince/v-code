// codeContext.js
import React, { createContext, useContext, useState } from "react";
import { blockItems } from "../components/blocks";
import { v4 as uuidv4 } from 'uuid';

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

    const { source, destination } = dragResult;

    if (
      source.droppableId === "components" &&
      destination.droppableId === "canvas"
    ) {
      const draggedItem = codeState.items[source.index];

      // Generate unique ID for the dragged item
      const updatedItem = {
        ...draggedItem,
        id: uuidv4(),
      };

      setCodeState((prevState: any) => ({
        ...prevState,
        blocks: [...prevState.blocks, updatedItem],
      }));
    }
  };

  const setCodeItems = (values: any) => {
    console.log("🚀 ~ file: code.tsx:41 ~ setCodeItems ~ values:", values);

    // Generate unique IDs for new items
    const newItemsWithIds = values.map((item: any) => ({
      ...item,
      id: uuidv4(), // Add a new id property with a unique value
    }));

    // Replace the existing items with the new items
    setCodeState((prevState: any) => ({
      ...prevState,
      blocks: newItemsWithIds,
    }));
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

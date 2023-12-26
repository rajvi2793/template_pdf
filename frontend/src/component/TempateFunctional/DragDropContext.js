import React, { useState, createContext, useContext } from 'react';

const DragDropContext = createContext();

export const DragDropProvider = ({ children }) => {
  const [draggedRecipient, setDraggedRecipient] = useState(null);

  const handleDragRecipient = (recipient) => {
    setDraggedRecipient(recipient);
  };

  const handleDropRecipient = () => {
    setDraggedRecipient(null);
  };

  return (
    <DragDropContext.Provider value={{ draggedRecipient, handleDragRecipient, handleDropRecipient }}>
      {children}
    </DragDropContext.Provider>
  );
};

export const useDragDropContext = () => {
  return useContext(DragDropContext);
};

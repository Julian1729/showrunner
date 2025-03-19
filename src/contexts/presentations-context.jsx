import React, { createContext, useContext } from "react";
import usePresentations from "../hooks/use-presentations";

const PresentationContext = createContext();

export const PresentationsProvider = ({ children }) => {
  const {
    presentations,
    createPresentation,
    removePresentation,
    editPresentation,
  } = usePresentations();

  return (
    <PresentationContext.Provider
      value={{
        presentations,
        createPresentation,
        removePresentation,
        editPresentation,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export const usePresentationsContext = () => {
  return useContext(PresentationContext);
};

import { useState, useEffect } from "react";

import { nanoid } from "nanoid";

const usePresentations = () => {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    const storedPresentations =
      JSON.parse(localStorage.getItem("presentations")) || [];
    setPresentations(storedPresentations);
  }, []);

  const createPresentation = (presentation) => {
    presentation.id = nanoid();
    const newPresentations = [...presentations, presentation];
    setPresentations(newPresentations);
    localStorage.setItem("presentations", JSON.stringify(newPresentations));
  };

  const removePresentation = (id) => {
    const newPresentations = presentations.filter(
      (presentation) => presentation.id !== id
    );
    setPresentations(newPresentations);
    localStorage.setItem("presentations", JSON.stringify(newPresentations));
  };

  const editPresentation = (id, updatedPresentation) => {
    const newPresentations = presentations.map((presentation) =>
      presentation.id === id
        ? { ...presentation, ...updatedPresentation }
        : presentation
    );
    setPresentations(newPresentations);
    localStorage.setItem("presentations", JSON.stringify(newPresentations));
  };

  return {
    presentations,
    createPresentation,
    removePresentation,
    editPresentation,
  };
};

export default usePresentations;

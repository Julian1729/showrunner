import _ from "lodash";
import { useState, useEffect } from "react";

import { generatePresentationId } from "../utils/presentations";

const usePresentations = () => {
  // WARNING: Because we are using an array instead of an object with the id as the key, there is a risk of duplicate ids
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    const storedPresentations =
      JSON.parse(localStorage.getItem("presentations")) || [];
    setPresentations(storedPresentations);
  }, []);

  const createPresentation = (presentation = {}) => {
    // use lodash to set defaults for presentation
    presentation = _.defaultsDeep(presentation, {
      id: generatePresentationId(),
      name: "",
      mode: "fixed",
      duration: 0,
      sections: [],
      timer: {
        autoPlay: false,
        startTime: null,
        endTime: null,
      },
    });

    const newPresentations = [...presentations, presentation];
    setPresentations(newPresentations);
    localStorage.setItem("presentations", JSON.stringify(newPresentations));
    return presentation;
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

import { nanoid } from "nanoid";

export const generatePresentationId = () => {
  const id = nanoid();
  return id;
};

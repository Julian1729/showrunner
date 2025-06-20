import { useState } from "react";
import { styled } from "@mui/material/styles";
import { useLongPress } from "use-long-press";

import SectionItem from "./SectionItem";
import SectionOptionsDialog from "./SectionOptionsDialog";

const StyledList = styled("ul")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  margin: 0,
  padding: 0,
}));

export default function SectionList({
  sections,
  setNameSectionDialogOpen,
  setSelectedSection,
  selectedSection,
  onDeleteSection,
  unassignedMinutes,
  handleDurationChange,
}) {
  const [isOptionsDialogOpen, setIsOptionsDialogOpen] = useState(false);

  const handleDeleteSection = () => {
    // Logic to delete the section
    setIsOptionsDialogOpen(false);
    onDeleteSection(selectedSection.name);
    setSelectedSection(null);
  };

  const handleRenameSection = () => {
    setIsOptionsDialogOpen(false);
    setNameSectionDialogOpen(true);
  };

  const bindLongPress = useLongPress((e, { context: section }) => {
    e.stopPropagation();
    setSelectedSection(section);
    setIsOptionsDialogOpen(true);
  });

  return (
    <>
      <StyledList>
        {sections.map((section, index) => (
          <SectionItem
            key={section.name}
            order={index + 1}
            unassignedMinutes={unassignedMinutes}
            onDurationChange={handleDurationChange}
            {...section}
            {...bindLongPress(section)}
          />
        ))}
      </StyledList>
      <SectionOptionsDialog
        open={isOptionsDialogOpen}
        section={selectedSection}
        onClose={() => setIsOptionsDialogOpen(false)}
        onRenameSection={handleRenameSection}
        onDeleteSection={handleDeleteSection}
      />
    </>
  );
}

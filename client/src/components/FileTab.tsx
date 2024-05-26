// React
import { useState } from "react";

// Types
import FileType from "../types/FileType";
import { Button, Group, Text, TextInput } from "@mantine/core";
import FileEditOptions from "./FileEditOptions";

import { useMediaQuery } from "@mantine/hooks";

type FileTabProps = {
  file: FileType;
  paddingLeft: number;
  onDelete: (arg0: string[], arg1: string, arg2: string) => void;
  onToggleEdit: (arg0: string[], arg1: string) => void;
  onUpdateName: (arg0: string[], arg1: string, arg2: string) => void;
  onSelectFile: (arg0: string, arg1: string[], arg2: string) => void;
  onAddFileTab: (arg0: string, arg1: string, arg2: string[]) => void;
};

const FileTab = ({ file, paddingLeft, onDelete, onToggleEdit, onAddFileTab, onUpdateName, onSelectFile }: FileTabProps) => {
  const [isHover, setIsHover] = useState(false);
  const [newName, setNewName] = useState(file.name);

  const smallScreen = useMediaQuery("(max-width: 36em");
  const mediumScreen = useMediaQuery("(max-width: 62em");
  const bigScreen = useMediaQuery("(max-width: 75em");

  return (
    <Group
      align="center"
      h="2rem"
      bg="dark.6"
      style={{ paddingLeft: `${paddingLeft}rem`, borderTop: "1px solid black", borderBottom: "1px solid black" }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {file.isEditingName ? (
        <>
          <TextInput
            size="compact-xs"
            type="text"
            rightSection={
              <Button
                variant="transparent"
                size="compact-xs"
                onClick={() => {
                  onToggleEdit(file.parentFolderIds, file.id);
                  onUpdateName(file.parentFolderIds, file.id, newName);
                }}
              >
                Save
              </Button>
            }
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </>
      ) : (
        <Group justify="space-between" w="100%">
          <Text size="sm">{file.name}</Text>
          {(smallScreen || mediumScreen) && <FileEditOptions fileId={file.id} parentFolderIds={file.parentFolderIds} onEditName={onToggleEdit} onDelete={onDelete} />}
        </Group>
      )}
    </Group>
  );
};

export default FileTab;

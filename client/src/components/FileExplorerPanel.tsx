// Mantine
import { Stack } from "@mantine/core";

// Components
import FolderTab from "./FolderTab";
import FileTab from "./FileTab";

// Types
import FileAndFolderTreeType from "../types/FileAndFolderTreeType";
import FolderType from "../types/FolderType";
import FileType from "../types/FileType";
import { onDelete, onToggleEdit, onUpdateName, onAdd, onToggleExpand, onSelectFile, onAddFileTab } from "../types/crudFunctionsTypes";

type FileExplorerPanelProps = {
  data: FileAndFolderTreeType;
  selectedFileId: string | undefined;
  onDelete: onDelete;
  onToggleEdit: onToggleEdit;
  onUpdateName: onUpdateName;
  onAddFileTab: onAddFileTab;
  onAdd: onAdd;
  onToggleExpand: onToggleExpand;
  onSelectFile: onSelectFile;
};

const isFolder = (item: FolderType | FileType): item is FolderType => {
  return (item as FolderType).isExpand !== undefined;
};

const FileExplorerPanel = ({ data, selectedFileId, onToggleExpand, onUpdateName, onAddFileTab, onToggleEdit, onAdd, onDelete, onSelectFile }: FileExplorerPanelProps) => {
  return (
    <Stack h="100vh" style={{ flex: "1 1 0px" }} gap="0" m="0" id="folder-and-files-panel">
      {data.map((item) => {
        if (isFolder(item)) {
          return (
            <FolderTab
              key={item.id}
              selectedFileId={selectedFileId}
              folder={item}
              paddingLeft={1}
              onToggleExpand={onToggleExpand}
              onUpdateName={onUpdateName}
              onToggleEdit={onToggleEdit}
              onAddFileTab={onAddFileTab}
              onAdd={onAdd}
              onDelete={onDelete}
              onSelectFile={onSelectFile}
            />
          );
        } else if (item.type === "File") {
          return (
            <FileTab
              key={item.id}
              selectedFileId={selectedFileId}
              file={item}
              paddingLeft={1}
              onDelete={onDelete}
              onToggleEdit={onToggleEdit}
              onUpdateName={onUpdateName}
              onAddFileTab={onAddFileTab}
              onSelectFile={onSelectFile}
            />
          );
        }
      })}
    </Stack>
  );
};

export default FileExplorerPanel;

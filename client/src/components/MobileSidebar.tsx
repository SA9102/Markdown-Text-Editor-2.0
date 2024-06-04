// Mantine
import { Drawer, CloseButton, ActionIcon, Group, Divider } from "@mantine/core";

// Types
import FileAndFolderTreeType from "../types/FileAndFolderTreeType";
import { onToggleExpand, onUpdateName, onToggleEdit, onAddFileTab, onAdd, onDelete, onSelectFile } from "../types/crudFunctionsTypes";

// Tabler Icons
import { IconFileFilled, IconFolderFilled } from "@tabler/icons-react";

// Components
import FileExplorerPanel from "./FileExplorerPanel";

// Utils
import iconStyle from "../utils/iconStyle";

type props = {
  data: FileAndFolderTreeType;
  selectedFileId: string;
  onToggleExpandFolder: onToggleExpand;
  onUpdateItemName: onUpdateName;
  onEditItem: onToggleEdit;
  onAddFileTab: onAddFileTab;
  onAddItem: onAdd;
  onDeleteItem: onDelete;
  onSelectFile: onSelectFile;
  fileExplorerOpened: boolean;
  onClose: () => void;
};

// --- THIS COMPONENT IS ONLY FOR MOBILE DEVICES ---
const MobileSidebar = ({ data, selectedFileId, onToggleExpandFolder, onUpdateItemName, onEditItem, onAddFileTab, onAddItem, onDeleteItem, onSelectFile, fileExplorerOpened, onClose }: props) => {
  return (
    <Drawer hiddenFrom="md" p="0" size="100%" opened={fileExplorerOpened} onClose={onClose} withCloseButton={false} transitionProps={{ duration: 200, timingFunction: "ease" }}>
      <Group mb="lg">
        <CloseButton onClick={onClose} />
        <Group gap="xs">
          <ActionIcon onClick={() => onAddItem(null, null, "File")}>
            <IconFileFilled style={iconStyle} />
          </ActionIcon>
          <ActionIcon onClick={() => onAddItem(null, null, "Folder")}>
            <IconFolderFilled style={iconStyle} />
          </ActionIcon>
        </Group>
      </Group>

      {data.length > 0 && <Divider />}

      <FileExplorerPanel
        data={data}
        selectedFileId={selectedFileId}
        onToggleExpand={onToggleExpandFolder}
        onUpdateName={onUpdateItemName}
        onToggleEdit={onEditItem}
        onAddFileTab={onAddFileTab}
        onAdd={onAddItem}
        onDelete={onDeleteItem}
        onSelectFile={onSelectFile}
      />
    </Drawer>
  );
};

export default MobileSidebar;

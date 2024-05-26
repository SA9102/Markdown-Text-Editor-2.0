import { Drawer, CloseButton, Tooltip, ActionIcon } from "@mantine/core";
import { IconFileFilled, IconFolderFilled } from "@tabler/icons-react";

import FileExplorerPanel from "./FileExplorerPanel";

// This component is only for mobile devices.

const MobileSidebar = ({ data, onToggleExpandFolder, onUpdateItemName, onEditItem, onAddFileTab, onAddItem, onDeleteItem, onSelectFile, fileExplorerOpened, onClose }) => {
  return (
    <Drawer p="0" size="100%" opened={fileExplorerOpened} onClose={onClose} withCloseButton={false} transitionProps={{ duration: 200, timingFunction: "ease" }}>
      <CloseButton onClick={onClose} />

      <Tooltip.Group openDelay={600} closeDelay={100}>
        <Tooltip label="New File" withArrow arrowSize={5}>
          <ActionIcon size="lg" variant="subtle" onClick={() => onAddItem(null, null, "File")}>
            <IconFileFilled />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="New Folder" withArrow arrowSize={5}>
          <ActionIcon size="lg" variant="subtle" onClick={() => onAddItem(null, null, "Folder")}>
            <IconFolderFilled />
          </ActionIcon>
        </Tooltip>
      </Tooltip.Group>
      <FileExplorerPanel
        data={data}
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

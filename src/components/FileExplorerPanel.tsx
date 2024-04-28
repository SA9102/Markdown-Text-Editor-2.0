import FolderTab from './FolderTab';
import FileTab from './FileTab';

import FileAndFolderTreeType from '../types/FileAndFolderTreeType';
import FolderType from '../types/FolderType';
import FileType from '../types/FileType';

type FileExplorerPanelProps = {
  data: FileAndFolderTreeType;
  onDelete: (arg0: string[], arg1: string) => void;
  onToggleEdit: (arg0: string[], arg1: string) => void;
  onUpdateName: (arg0: string[], arg1: string, arg2: string) => void;
  onUpdateBody: (arg0: string[], arg1: string, arg2: string) => void;
  onAdd: (arg0: string[], arg1: string, arg2: string) => void;
  onToggleExpand: (arg0: string[], arg1: string) => void;
  onSelectFile: (arg0: string) => void;
};

const isFolder = (item: FolderType | FileType): item is FolderType => {
  return (item as FolderType).isExpand !== undefined;
};

const FileExplorerPanel = ({
  data,
  onToggleExpand,
  onUpdateName,
  onUpdateBody,
  onToggleEdit,
  onAdd,
  onDelete,
  onSelectFile,
}: FileExplorerPanelProps) => {
  return (
    <div id="folder-and-files-panel">
      {data.map((item) => {
        if (isFolder(item)) {
          return (
            <FolderTab
              key={item.id}
              folder={item}
              paddingLeft={1}
              onToggleExpand={onToggleExpand}
              onUpdateName={onUpdateName}
              onUpdateBody={onUpdateBody}
              onToggleEdit={onToggleEdit}
              onAdd={onAdd}
              onDelete={onDelete}
              onSelectFile={onSelectFile}
            />
          );
        } else if (item.type === 'File') {
          return (
            <FileTab
              key={item.id}
              file={item}
              paddingLeft={1}
              onDelete={onDelete}
              onToggleEdit={onToggleEdit}
              onUpdateName={onUpdateName}
              onUpdateBody={onUpdateBody}
              onSelectFile={onSelectFile}
            />
          );
        }
      })}
    </div>
  );
};

export default FileExplorerPanel;

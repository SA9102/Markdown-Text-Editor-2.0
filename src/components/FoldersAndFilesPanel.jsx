import FolderTab from './FolderTab';
import FileTab from './FileTab';

const FoldersAndFilesPanel = ({
  data,
  onToggleExpand,
  onUpdate,
  onToggleEdit,
  onAdd,
  onDelete,
}) => {
  return (
    <div id="folder-and-files-panel">
      {data.map((item) => {
        if (item.type === 'Folder') {
          return (
            <FolderTab
              key={item.id}
              folder={item}
              paddingLeft={1}
              onToggleExpand={onToggleExpand}
              onUpdate={onUpdate}
              onToggleEdit={onToggleEdit}
              onAdd={onAdd}
              onDelete={onDelete}
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
              onUpdate={onUpdate}
            />
          );
        }
      })}
    </div>
  );
};

export default FoldersAndFilesPanel;

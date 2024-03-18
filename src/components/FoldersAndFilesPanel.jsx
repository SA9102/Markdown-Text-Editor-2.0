import FolderTab from './FolderTab';

const FoldersAndFilesPanel = ({
  data,
  onToggleExpand,
  onUpdate,
  onToggleEdit,
  onAdd,
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
            />
          );
        }
      })}
    </div>
  );
};

export default FoldersAndFilesPanel;

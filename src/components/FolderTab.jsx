import { useState } from 'react';
import FileTab from './FileTab';
import '../styles/FolderTab.css';

const FolderTab = ({
  folder,
  paddingLeft,
  onUpdate,
  onToggleExpand,
  onToggleEdit,
  onAdd,
  onDelete,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  return (
    <>
      <div
        className="folder-tab"
        style={{ paddingLeft: `${paddingLeft}rem` }}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        // onDoubleClick={() => setEditing(true)}
      >
        {folder.isEditingName ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button
              onClick={() => {
                onToggleEdit(folder.parentFolderIds, folder.id);
                onUpdate(folder.parentFolderIds, folder.id, newName);
                // setEditing(false);
              }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p>
              {folder.expand ? (
                <i
                  className="fa-solid fa-caret-down"
                  onClick={() =>
                    onToggleExpand(folder.parentFolderIds, folder.id)
                  }
                ></i>
              ) : (
                <i
                  className="fa-solid fa-caret-right"
                  onClick={() =>
                    onToggleExpand(folder.parentFolderIds, folder.id)
                  }
                ></i>
              )}
              {folder.name}
            </p>
            {isHover && (
              <>
                <button
                  onClick={() =>
                    onAdd(folder.parentFolderIds, folder.id, 'File')
                  }
                >
                  <i className="fa-solid fa-file"></i>
                </button>
                <button
                  onClick={() =>
                    onAdd(folder.parentFolderIds, folder.id, 'Folder')
                  }
                >
                  <i className="fa-solid fa-folder"></i>
                </button>
                <button
                  onClick={() =>
                    onToggleEdit(folder.parentFolderIds, folder.id)
                  }
                >
                  <i className="fa-solid fa-pen"></i>
                </button>
                <button
                  onClick={() => onDelete(folder.parentFolderIds, folder.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </>
            )}
          </>
        )}
      </div>
      {folder.items.map((item) => {
        if (item.type === 'Folder') {
          if (folder.expand) {
            return (
              <FolderTab
                key={item.id}
                folder={item}
                paddingLeft={paddingLeft + 1}
                onToggleExpand={onToggleExpand}
                onUpdate={onUpdate}
                onToggleEdit={onToggleEdit}
                onAdd={onAdd}
                onDelete={onDelete}
              />
            );
          }
        } else if (item.type === 'File') {
          return (
            <FileTab
              key={item.id}
              file={item}
              paddingLeft={paddingLeft + 1}
              onDelete={onDelete}
              onToggleEdit={onToggleEdit}
              onUpdate={onUpdate}
            />
          );
        }
      })}
    </>
  );
};

export default FolderTab;

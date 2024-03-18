import { useState } from 'react';
import '../styles/FolderTab.css';

const FolderTab = ({
  folder,
  paddingLeft,
  onUpdate,
  onToggleExpand,
  onToggleEdit,
  onAdd,
}) => {
  const [isHover, setIsHover] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  console.log(folder.isEditing);
  return (
    <>
      <div
        className="folder-tab"
        style={{ paddingLeft: `${paddingLeft}rem` }}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        // onDoubleClick={() => setEditing(true)}
      >
        {folder.isEditing ? (
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
                  className="fa-solid fa-angle-down"
                  onClick={() =>
                    onToggleExpand(folder.parentFolderIds, folder.id)
                  }
                ></i>
              ) : (
                <i
                  className="fa-solid fa-angle-right"
                  onClick={() =>
                    onToggleExpand(folder.parentFolderIds, folder.id)
                  }
                ></i>
              )}
              {folder.name}
            </p>
            {isHover && (
              <>
                <button>
                  <i className="fa-solid fa-file"></i>
                </button>
                <button
                  onClick={() => onAdd(folder.parentFolderIds, folder.id)}
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
                <button>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </>
            )}
          </>
        )}
      </div>
      {folder.items.map((item) => {
        if (item.type === 'Folder' && folder.expand) {
          return (
            <FolderTab
              key={item.id}
              folder={item}
              paddingLeft={paddingLeft + 1}
              onToggleExpand={onToggleExpand}
              onUpdate={onUpdate}
              onToggleEdit={onToggleEdit}
              onAdd={onAdd}
            />
          );
        }
      })}
    </>
  );
};

export default FolderTab;

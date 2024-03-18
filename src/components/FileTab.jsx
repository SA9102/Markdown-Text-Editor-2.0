import { useState } from 'react';

const FileTab = ({ file, paddingLeft, onDelete, onToggleEdit, onUpdate }) => {
  const [isHover, setIsHover] = useState(false);
  const [newName, setNewName] = useState(file.name);
  console.log(newName);
  return (
    <div
      className="file-tab"
      style={{ paddingLeft: `${paddingLeft}rem` }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      // onDoubleClick={() => setEditing(true)}
    >
      {file.isEditingName ? (
        <>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button
            onClick={() => {
              onToggleEdit(file.parentFolderIds, file.id);
              onUpdate(file.parentFolderIds, file.id, newName);
              // setEditing(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p>{file.name}</p>
          {isHover && (
            <>
              <button
                onClick={() => onToggleEdit(file.parentFolderIds, file.id)}
              >
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => onDelete(file.parentFolderIds, file.id)}>
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FileTab;

// React
import { useState } from "react";

// Types
import FileType from "../types/FileType";

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

  return (
    <div
      className="file-tab"
      style={{ paddingLeft: `${paddingLeft}rem` }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={() => {
        onSelectFile(file.id, file.parentFolderIds, file.name);
      }}
      onDoubleClick={() => {
        onAddFileTab(file.id, file.name, file.parentFolderIds);
      }}
    >
      {file.isEditingName ? (
        <>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
          <button
            onClick={() => {
              onToggleEdit(file.parentFolderIds, file.id);
              onUpdateName(file.parentFolderIds, file.id, newName);
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
              <button onClick={() => onToggleEdit(file.parentFolderIds, file.id)}>
                <i className="fa-solid fa-pen"></i>
              </button>
              <button onClick={() => onDelete(file.parentFolderIds, file.id, "file")}>
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

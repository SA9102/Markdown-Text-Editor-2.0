import { useState } from 'react';
import FileTab from './FileTab';
import '../styles/FolderTab.css';

import FolderType from '../types/FolderType';
import FileType from '../types/FileType';
import FileAndFolderTreeType from '../types/FileAndFolderTreeType';

type FolderTabProps = {
    folder: FolderType;
    paddingLeft: number;
    onDelete: (arg0: string[], arg1: string, arg2: string) => void;
    onToggleEdit: (arg0: string[], arg1: string) => void;
    onUpdateName: (arg0: string[], arg1: string, arg2: string) => void;
    onUpdateBody: (arg0: string[], arg1: string, arg2: string) => void;
    onAdd: (arg0: string[], arg1: string, arg2: string) => void;
    onToggleExpand: (arg0: string[], arg1: string) => void;
    onSelectFile: (arg0: string, arg1: string[], arg2: string) => void;
};

const isFolder = (item: FolderType | FileType): item is FolderType => {
    return (item as FolderType).isExpand !== undefined;
};

const FolderTab = ({ folder, paddingLeft, onUpdateName, onUpdateBody, onToggleExpand, onToggleEdit, onAdd, onDelete, onSelectFile }: FolderTabProps) => {
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
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                        <button
                            onClick={() => {
                                onToggleEdit(folder.parentFolderIds, folder.id);
                                onUpdateName(folder.parentFolderIds, folder.id, newName);
                                // setEditing(false);
                            }}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        <p>
                            {folder.isExpand ? (
                                <i className="fa-solid fa-chevron-down" onClick={() => onToggleExpand(folder.parentFolderIds, folder.id)}></i>
                            ) : (
                                <i className="fa-solid fa-chevron-right" onClick={() => onToggleExpand(folder.parentFolderIds, folder.id)}></i>
                            )}
                            {folder.name}
                        </p>
                        {isHover && (
                            <>
                                <button onClick={() => onAdd(folder.parentFolderIds, folder.id, 'File')}>
                                    <i className="fa-solid fa-file"></i>
                                </button>
                                <button onClick={() => onAdd(folder.parentFolderIds, folder.id, 'Folder')}>
                                    <i className="fa-solid fa-folder"></i>
                                </button>
                                <button onClick={() => onToggleEdit(folder.parentFolderIds, folder.id)}>
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button onClick={() => onDelete(folder.parentFolderIds, folder.id, 'folder')}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
            {folder.items.map((item) => {
                if (isFolder(item)) {
                    if (folder.isExpand) {
                        return (
                            <FolderTab
                                key={item.id}
                                folder={item}
                                paddingLeft={paddingLeft + 1}
                                onToggleExpand={onToggleExpand}
                                onUpdateName={onUpdateName}
                                onUpdateBody={onUpdateBody}
                                onToggleEdit={onToggleEdit}
                                onAdd={onAdd}
                                onDelete={onDelete}
                                onSelectFile={onSelectFile}
                            />
                        );
                    }
                } else {
                    if (folder.isExpand) {
                        return (
                            <FileTab
                                key={item.id}
                                file={item}
                                paddingLeft={paddingLeft + 1}
                                onDelete={onDelete}
                                onToggleEdit={onToggleEdit}
                                onUpdateName={onUpdateName}
                                onUpdateBody={onUpdateBody}
                                onSelectFile={onSelectFile}
                            />
                        );
                    }
                }
            })}
        </>
    );
};

export default FolderTab;

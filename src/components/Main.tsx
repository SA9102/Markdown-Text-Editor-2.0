// Hook/NPM package imports
//
import { useState, useReducer, useMemo } from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

// Types
import FileAndFolderTreeType from '../types/FileAndFolderTreeType';
import FolderType from '../types/FolderType';
import FileType from '../types/FileType';

// Component imports
//
// import NoteEditor from './NoteEditor';
// import MarkdownDisplay from './MarkdownDisplay';
// import NotesPanel from './NotesPanel';
import MarkdownEditor from '../componentsNew/MarkdownEditor';
import MarkdownViewer from '../componentsNew/MarkdownViewer';

import FileExplorerPanel from './FileExplorerPanel';

import testData from '../testData';

import FileExplorerContext from '../context/FileExplorerContext';

const enum ACTIONS {
    ADD_ITEM,
    UPDATE_ITEM_NAME,
    EDIT_ITEM,
    DELETE_ITEM,
    EXPAND_FOLDER,
    UPDATE_FILE_BODY,
}

const isFile = (item: FolderType | FileType): item is FileType => {
    return (item as FileType).body !== undefined;
};

type FileCacheType = {
    id: string;
    parentFolderIds: string[];
    body: string;
};

type RecentFileTabsType = {
    id: string;
    name: string;
};

const Main = () => {
    // Uncomment line below to reset local storage for this app.
    // localStorage.clear()

    // Returns the current full date and time.
    //
    const getCurrentDateAndTime = () => {
        return new Date().toLocaleString('default', {
            dateStyle: 'full',
            timeStyle: 'long',
        });
    }; // END getCurrentDateAndTime

    // if (!localStorage.getItem('notes')) {
    //   localStorage.setItem('notes', JSON.stringify(testData));
    // }

    // const [data, setData] = useState(JSON.parse(localStorage.getItem('notes')));
    // localStorage.clear();
    // localStorage.setItem('files', JSON.stringify([]));

    // const [selectedFile, setSelectedFile] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState('-1');
    const [textEditor, setTextEditor] = useState<string>('');
    const [fileExplorerOpen, setFileExplorerOpen] = useState(true);
    const [editorAndViewer, setEditorAndViewer] = useState(true);
    const [recentFileTabs, setRecentFileTabs] = useState<RecentFileTabsType[]>([]);

    const [data, dispatch] = useReducer(
        produce((draft, action) => {
            switch (action.type) {
                case ACTIONS.ADD_ITEM:
                    if (action.payload.idChain === null) {
                        if (action.payload.itemType === 'Folder') {
                            // console.log('CREATING NEW FOLDER');
                            draft.unshift({
                                id: uuidv4(),
                                parentFolderIds: [],
                                type: 'Folder',
                                name: 'Untitled',
                                isExpand: true,
                                isEditingName: true,
                                items: [],
                            });
                        } else if (action.payload.itemType === 'File') {
                            const currentNotes = localStorage.getItem('files');
                            const id = uuidv4();
                            // console.log('CREATING NEW FILE');
                            if (currentNotes) {
                                const currentNotesObj = JSON.parse(currentNotes);
                                currentNotesObj.push({ id: id, parentFolderIds: [], body: '' });
                                localStorage.setItem('files', JSON.stringify(currentNotesObj));
                            }
                            draft.unshift({
                                id: id,
                                parentFolderIds: [],
                                type: 'File',
                                name: 'Untitled',
                                body: '',
                                isSelected: false,
                                isEditingName: true,
                            });
                        }
                    } else {
                        for (let i = 0; i < action.payload.idChain.length; i++) {
                            draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
                        }
                        draft = draft.find((folder: FolderType) => folder.id === action.payload.targetItemId);
                        draft.expand = true;
                        if (action.payload.itemType === 'Folder') {
                            // console.log(action.payload.targetItemId);
                            draft.items = [
                                {
                                    id: uuidv4(),
                                    parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
                                    type: 'Folder',
                                    name: 'Untitled',
                                    isExpand: false,
                                    isEditingName: true,
                                    items: [],
                                },
                                ...draft.items,
                            ];
                        } else if (action.payload.itemType === 'File') {
                            const currentNotes = localStorage.getItem('files');
                            const id = uuidv4();
                            if (currentNotes) {
                                // console.log('INSIDE');
                                const currentNotesObj = JSON.parse(currentNotes);
                                currentNotesObj.push({ id: id, parentFolderIds: [...action.payload.idChain, action.payload.targetItemId], body: '' });
                                localStorage.setItem('files', JSON.stringify(currentNotesObj));
                                // console.log('CURRENT NOTES OBJ');
                                // console.log(currentNotesObj);
                            }
                            draft.items = [
                                {
                                    id: id,
                                    parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
                                    type: 'File',
                                    name: 'Untitled',
                                    body: '',
                                    isSelected: false,
                                    isEditingName: true,
                                },
                                ...draft.items,
                            ];
                        }
                    }
                    break;

                case ACTIONS.UPDATE_FILE_BODY:
                    break;

                case ACTIONS.UPDATE_ITEM_NAME:
                    for (let i = 0; i < action.payload.idChain.length; i++) {
                        draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
                    }
                    draft = draft.find((item: FolderType | FileType) => item.id === action.payload.targetItemId);
                    draft.name = action.payload.newItemName;
                    draft.isEditingName = false;

                    break;

                case ACTIONS.EDIT_ITEM:
                    for (let i = 0; i < action.payload.idChain.length; i++) {
                        draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
                    }
                    draft = draft.find((item: FolderType | FileType) => item.id === action.payload.targetItemId);
                    draft.isEditingName = true;
                    break;

                case ACTIONS.DELETE_ITEM:
                    for (let i = 0; i < action.payload.idChain.length; i++) {
                        draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
                    }
                    const index = draft.findIndex((item: FolderType | FileType) => item.id === action.payload.targetItemId);
                    draft.splice(index, 1);

                    if (action.payload.targetItemId === selectedFile) {
                        setSelectedFile('-1');
                    }

                    const currentNotes = localStorage.getItem('files');
                    if (currentNotes) {
                        let currentNotesObj = JSON.parse(currentNotes);
                        currentNotesObj = currentNotesObj.filter((file: FileCacheType) => file.id !== action.payload.targetItemId);
                        localStorage.setItem('files', JSON.stringify(currentNotesObj));
                    }

                    break;

                case ACTIONS.EXPAND_FOLDER:
                    for (let i = 0; i < action.payload.idChain.length; i++) {
                        draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
                    }
                    draft = draft.find((folder: FolderType) => folder.id === action.payload.targetFolderId);
                    draft.isExpand = !draft.isExpand;
                    break;

                default:
                    break;
            }
        }),
        testData
    );

    const handleAddItem = (idChain: string[] | null, targetItemId: string | null, itemType: string) => {
        dispatch({
            type: ACTIONS.ADD_ITEM,
            payload: { idChain, targetItemId, itemType },
        });
    };

    /* ::FILE/FOLDER ACTIONS:: */

    // Handles the expanding/minimising of a folder (when a folder is expanded,
    // its subfolders are shown).
    //
    const handleToggleExpandFolder = (idChain: string[], targetFolderId: string) => {
        dispatch({
            type: ACTIONS.EXPAND_FOLDER,
            payload: { idChain, targetFolderId },
        });
    };

    // Handles the updating of the folder name, when the user has saved the
    // changes to the new name of the folder.
    //
    const handleUpdateItemName = (idChain: string[], targetItemId: string, newItemName: string) => {
        dispatch({
            type: ACTIONS.UPDATE_ITEM_NAME,
            payload: { idChain, targetItemId, newItemName },
        });

        const newRecentFileTabs = [...recentFileTabs];
        const existingFile = newRecentFileTabs.find((file: RecentFileTabsType) => file.id === targetItemId);
        if (existingFile) {
            console.log('THE FILE EXISTS');
            existingFile.name = newItemName;
            setRecentFileTabs(newRecentFileTabs);
        }
    };

    const handleUpdateFileBody = (idChain: string[], targetFileId: string, newFileBody: string) => {
        const currentNotes = localStorage.getItem('files');
        if (currentNotes) {
            let currentNotesObj = JSON.parse(currentNotes);
            currentNotesObj = currentNotesObj.map((file: FileCacheType) => {
                if (file.id === targetFileId) {
                    file.body = newFileBody;
                }
                return file;
            });
            localStorage.setItem('files', JSON.stringify(currentNotesObj));
        }
        // if (idChain === null) {
        //     if (currentNotes) {
        //         let currentNotesObj = JSON.parse(currentNotes);
        //         currentNotesObj = currentNotesObj.map((file: FileCacheType) => {
        //             if (file.id === targetFileId) {
        //                 file.body = newFileBody;
        //             }
        //             return file
        //         })
        //         localStorage.setItem('files', JSON.stringify(currentNotesObj));
        //     }
        // } else {
        //     const currentNotes = localStorage.getItem('files');
        //     if (currentNotes) {
        //         let currentNotesObj = JSON.parse(currentNotes);
        //         for (let i = 0; i < action.payload.idChain.length; i++) {
        //             draft = draft.find((folder: FolderType) => folder.id === action.payload.idChain[i]).items;
        //         }
        //     }

        //     draft = draft.find((folder: FolderType) => folder.id === action.payload.targetItemId);
        //     draft.expand = true;
        //     if (action.payload.itemType === 'Folder') {
        //         console.log(action.payload.targetItemId);
        //         draft.items = [
        //             {
        //                 id: uuidv4(),
        //                 parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
        //                 type: 'Folder',
        //                 name: 'Untitled',
        //                 isExpand: false,
        //                 isEditingName: true,
        //                 items: [],
        //             },
        //             ...draft.items,
        //         ];
        //     } else if (action.payload.itemType === 'File') {
        //         const currentNotes = localStorage.getItem('files');
        //         const id = uuidv4();
        //         if (currentNotes) {
        //             const currentNotesObj = JSON.parse(currentNotes);
        //             currentNotesObj.push({ id: id, parentFolderIds: [...action.payload.idChain, action.payload.targetItemId], body: '' });
        //             localStorage.setItem('files', JSON.stringify(currentNotesObj));
        //         }
        //         draft.items = [
        //             {
        //                 id: id,
        //                 parentFolderIds: [...action.payload.idChain, action.payload.targetItemId],
        //                 type: 'File',
        //                 name: 'Untitled',
        //                 body: '',
        //                 isSelected: false,
        //                 isEditingName: true,
        //             },
        //             ...draft.items,
        //         ];
        //     }
        // }
    };

    // Handles the display of the input, when the user is currently editing the
    // name of the folder.
    //
    const handleEditItem = (idChain: string[], targetItemId: string) => {
        dispatch({ type: ACTIONS.EDIT_ITEM, payload: { idChain, targetItemId } });
    };

    // Handles the deletion of a particular file/folder
    //
    const handleDeleteItem = (idChain: string[], targetItemId: string) => {
        dispatch({ type: ACTIONS.DELETE_ITEM, payload: { idChain, targetItemId } });

        const currentNotes = localStorage.getItem('files');
        if (currentNotes) {
            let currentNotesObj = JSON.parse(currentNotes);
            const currentFile = currentNotesObj.find((file: FileCacheType) => file.id === selectedFile);
            if (currentFile && currentFile.parentFolderIds.includes(targetItemId)) {
                currentNotesObj = currentNotesObj.filter((file: FileCacheType) => file.id !== selectedFile);
                const newRecentFileTabs = recentFileTabs.filter((file: RecentFileTabsType) => file.id !== selectedFile);
                setSelectedFile('-1');
                setTextEditor('');
                setRecentFileTabs(newRecentFileTabs);
            }
        }
    };

    const handleSelectFile = (id: string, name: string) => {
        // if (selectedFile.length > 0) {
        // }
        // setSelectedFile(idChain);

        // SAVING NOTES TO LOCAL STORAGE
        const currentNotes = localStorage.getItem('files');
        if (currentNotes) {
            let currentNotesObj = JSON.parse(currentNotes);
            if (selectedFile !== '-1') {
                currentNotesObj = currentNotesObj.map((file: FileCacheType) => {
                    if (file.id === selectedFile) {
                        file.body = textEditor;
                    }
                    return file;
                });
                localStorage.setItem('files', JSON.stringify(currentNotesObj));
            }

            const newSelectedFileBody = currentNotesObj.find((file: FileCacheType) => file.id === id).body;

            setTextEditor(newSelectedFileBody);
            setSelectedFile(id);

            const newRecentFileTabs = [...recentFileTabs];
            const existingFile = newRecentFileTabs.find((file: RecentFileTabsType) => file.id === id);
            if (!existingFile) {
                newRecentFileTabs.push({ id, name });
                setRecentFileTabs(newRecentFileTabs);
            }
        }
    };

    const handleChangeTextEditor = (newBody: string) => {
        setTextEditor(newBody);
    };

    // const currentFile = useMemo(() => {
    //     let currentItem = data;
    //     // if (selectedFile) {
    //     for (let i = 0; i < selectedFile.length - 1; i++) {
    //         currentItem = currentItem.find((item: FolderType) => item.id === selectedFile[i]).items;
    //     }

    //     return currentItem.find((file: FileType) => file.id === selectedFile[selectedFile.length - 1]);
    //     // }
    // }, [selectedFile]);
    // console.log(selectedFile);

    console.log('TEXT EDITOR:');
    console.log(textEditor);

    return (
        <main id="main">
            <div>
                <button onClick={() => setFileExplorerOpen(!fileExplorerOpen)}>File Explorer</button>
                <button onClick={() => setEditorAndViewer(!editorAndViewer)}>Showing: {editorAndViewer ? 'Editor and Viewer' : 'Viewer only'}</button>
            </div>
            {fileExplorerOpen && (
                <div id="file-explorer-panel">
                    <div id="toolbar">
                        <button onClick={() => handleAddItem(null, null, 'File')}>
                            <i className="fa-solid fa-file"></i>
                        </button>
                        <button onClick={() => handleAddItem(null, null, 'Folder')}>
                            <i className="fa-solid fa-folder"></i>
                        </button>
                    </div>
                    {/* <FileExplorerContext.Provider value={}> */}
                    <FileExplorerPanel
                        data={data}
                        onToggleExpand={handleToggleExpandFolder}
                        onUpdateName={handleUpdateItemName}
                        onUpdateBody={handleUpdateFileBody}
                        onToggleEdit={handleEditItem}
                        onAdd={handleAddItem}
                        onDelete={handleDeleteItem}
                        onSelectFile={handleSelectFile}
                    />
                </div>
            )}

            {/* </FileExplorerContext.Provider> */}
            {editorAndViewer ? (
                <>
                    <div id="markdown-editor-panel">{selectedFile !== '-1' && <MarkdownEditor id={selectedFile} body={textEditor} onChange={handleChangeTextEditor} />}</div>
                    <div id="markdown-viewer-panel">{selectedFile !== '-1' && <MarkdownViewer markdown={textEditor} />}</div>
                </>
            ) : (
                <>
                    <div id="markdown-viewer-panel">{selectedFile !== '-1' && <MarkdownViewer markdown={textEditor} />}</div>
                </>
            )}
            {recentFileTabs.map((file: RecentFileTabsType) => {
                return (
                    <div key={file.id}>
                        <button onClick={() => handleSelectFile(file.id, file.name)}>{file.name}</button>
                    </div>
                );
            })}

            {/* <NotesPanel
        notes={notes}
        noteIndex={noteIndex}
        currentNoteId={currentNoteId}
        onCreateNote={handleCreateNote}
        onDeleteNote={handleDeleteNote}
        onSaveNote={handleSaveNote}
        onSaveAllNotes={handleSaveAllNotes}
        onChangeNote={handleChangeNote}
        pageWrapId={"right-panel"}
        outerContainerId={"main"}
      />

      <div id="editor-display-panel">
        {notes[noteIndex].editing ? (
          <>
            <button
              className="icon-button"
              id="btn-view"
              onClick={() => handleToggleNoteEdit(noteIndex, false)}
            >
              <i className="fa-solid fa-eye"></i>
            </button>

            <NoteEditor
              note={notes[noteIndex]}
              noteIndex={noteIndex}
              onChange={onChange}
            />
          </>
        ) : (
          <>
            <button
              className="icon-button"
              id="btn-edit"
              onClick={() => handleToggleNoteEdit(noteIndex, true)}
            >
              <i className="fa-solid fa-pen"></i>
            </button>
            <MarkdownDisplay note={notes[noteIndex]} />
          </>
        )}
      </div> */}
        </main>
    );
};

export default Main;

// Holds the id of the currently selected note.
//
// const [currentNoteId, setCurrentNoteId] = useState(notes[0].id);
// const [saves, setSaves] = useState(0);

// When a user edits the title/text of a note, this method handles
// the change of the title/text of the note.
//
// const onChange = (event, noteIndex) => {
//   const updatedNote = {
//     ...notes[noteIndex],
//     [event.target.name]: event.target.value,
//   };

//   setNotes((draft) => {
//     draft[noteIndex] = updatedNote;
//   });
// }; // END onChange

// // Select the note with the given id.
// //
// const handleChangeNote = (id) => {
//   setCurrentNoteId(id);
// }; // END handleChangeNote

// // Handles the creation of a new note.
// //
// const handleCreateNote = () => {
//   const newNoteId = uuidv4();

//   setNotes([
//     ...notes,
//     {
//       id: newNoteId,
//       name: "Untitled",
//       text: "",
//       editing: true,
//       created: getCurrentDateAndTime(),
//       updated: getCurrentDateAndTime(),
//     },
//   ]);
//   setCurrentNoteId(newNoteId);
// }; // END handleCreateNote

// // Handles the deletion of the currently selected note.
// //
// const handleDeleteNote = () => {
//   const newNotes = notes.filter((note) => note.id != currentNoteId);
//   setNotes(newNotes);

//   if (currentNoteId == notes[0].id) {
//     // If the first note in the list is selected
//     if (notes.length == 1) {
//       setNotes([
//         {
//           id: currentNoteId,
//           name: "",
//           text: "",
//           created: getCurrentDateAndTime(),
//           editing: true,
//         },
//       ]);
//       setCurrentNoteId(currentNoteId);
//     } else {
//       setCurrentNoteId(notes[1].id);
//     }
//   } else {
//     setCurrentNoteId(notes[0].id);
//   }
// }; // END handleDeleteNote

// // Toggle a particular note for editing or for viewing in markdown.
// //
// const handleToggleNoteEdit = (noteIndex, editing) => {
//   const updatedNote = { ...notes[noteIndex], editing: editing };
//   setNotes((draft) => {
//     draft[noteIndex] = updatedNote;
//   });
// }; // END handleToggleNoteEdit

// // Saves the current note to the browser's local storage.
// //
// const handleSaveNote = (noteIndex) => {
//   let localStorageData = JSON.parse(localStorage.getItem("notes"));
//   localStorageData[noteIndex] = notes[noteIndex];
//   localStorage.setItem("notes", JSON.stringify(localStorageData));
//   setSaves(saves + 1); // Just to cause the page to re-render
// };

// const handleSaveAllNotes = () => {
//   localStorage.setItem("notes", JSON.stringify(notes));
//   setSaves(saves + 1); // Just to cause the page to re-render
// };

// // Get the index of the currently selected note.
// //
// const noteIndex = notes.findIndex((note) => note.id == currentNoteId);

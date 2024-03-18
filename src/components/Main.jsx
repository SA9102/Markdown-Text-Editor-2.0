// Hook/NPM package imports
//
import { useState, useReducer } from 'react';
import { useImmer } from 'use-immer'; // Allows you to directly 'mutate' an object in state
import { v4 as uuidv4 } from 'uuid';

// Component imports
//
import NoteEditor from './NoteEditor';
import MarkdownDisplay from './MarkdownDisplay';
import NotesPanel from './NotesPanel';
import FoldersAndFilesPanel from './FoldersAndFilesPanel';

import testData from '../testData';

import {
  toggleExpandFolder,
  updateFolder,
  toggleEditFolder,
  addFolder,
} from '../utils/dataOperations';

const ACTIONS = {
  ADD_FOLDER: 'add_folder',
  UPDATE_FOLDER: 'update_folder',
  EDIT_FOLDER: 'edit_folder',
  DELETE_FOLDER: 'delete_folder',
  TOGGLE_EXPAND_FOLDER: 'toggle_expand_folder',
};

const dataReducer = (data, action) => {
  switch (action.type) {
    case ACTIONS.ADD_FOLDER: {
      return addFolder(data, 0, action.idChain, action.folderId);
    }

    case ACTIONS.EDIT_FOLDER: {
      return toggleEditFolder(data, 0, action.idChain, action.folderId);
    }

    case ACTIONS.UPDATE_FOLDER: {
      return updateFolder(
        data,
        0,
        action.idChain,
        action.folderId,
        action.newFolderName
      );
    }

    case ACTIONS.TOGGLE_EXPAND_FOLDER: {
      return toggleExpandFolder(data, action.idChain, action.folderId);
    }
  }
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

  if (!localStorage.getItem('notes')) {
    localStorage.setItem('notes', JSON.stringify(testData));
  }

  // const [data, setData] = useState(JSON.parse(localStorage.getItem('notes')));
  const [data, setData] = useImmer(testData);
  // const [data, dataDispatch] = useReducer(
  //   dataReducer,
  //   // JSON.parse(localStorage.getItem('notes'))
  //   testData
  // );

  const handleAddFolder = (idChain, targetFolderId) => {
    setData((draft) => {
      if (idChain === null) {
        draft = [
          {
            id: uuidv4(),
            parentFolderIds: [],
            type: 'Folder',
            name: 'Untitled',
            expand: false,
            isEditing: true,
            items: [],
          },
          ...draft,
        ];
      } else {
        for (let i = 0; i < idChain.length; i++) {
          draft = draft.find((folder) => folder.id === idChain[i]).items;
        }
        draft = draft.find((folder) => folder.id === targetFolderId);
        draft.expand = true;
        draft.items = [
          {
            id: uuidv4(),
            parentFolderIds: [...idChain, targetFolderId],
            type: 'Folder',
            name: 'Untitled',
            expand: false,
            isEditing: true,
            items: [],
          },
          ...draft.items,
        ];
      }
    });
  };

  // Handles the expanding/minimising of a folder (when a folder is expanded,
  // its subfolders are shown).
  //
  const handleToggleExpandFolder = (idChain, targetFolderId) => {
    setData((draft) => {
      for (let i = 0; i < idChain.length; i++) {
        draft = draft.find((folder) => folder.id === idChain[i]).items;
      }
      draft = draft.find((folder) => folder.id === targetFolderId);
      draft.expand = !draft.expand;
    });
  }; // END handleToggleExpandFolder

  // Handles the updating of the folder name, when the user has saved the
  // changes to the new name of the folder.
  //
  const handleUpdateFolder = (idChain, targetFolderId, newFolderName) => {
    setData((draft) => {
      for (let i = 0; i < idChain.length; i++) {
        draft = draft.find((folder) => folder.id === idChain[i]).items;
      }
      draft = draft.find((folder) => folder.id === targetFolderId);
      draft.name = newFolderName;
      draft.isEditing = false;
    });
  }; // END handleUpdateFolder

  // Handles the display of the input, when the user is currently editing the
  // name of the folder.
  //
  const handleEditFolder = (idChain, targetFolderId) => {
    setData((draft) => {
      for (let i = 0; i < idChain.length; i++) {
        draft = draft.find((folder) => folder.id === idChain[i]).items;
      }
      draft = draft.find((folder) => folder.id === targetFolderId);
      draft.isEditing = true;
    });
  }; // END handleEditFolder

  const handleDeleteFolder = (idChain, targetFolderId) => {
    setData((draft) => {
      for (let i = 0; i < idChain.length; i++) {
        draft = draft.find((folder) => folder.id === idChain[i]).items;
      }
      const index = draft.findIndex((folder) => folder.id === targetFolderId);
      draft.splice(index, 1);
    });
  };

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
  return (
    <main id="main">
      <FoldersAndFilesPanel
        data={data}
        onToggleExpand={handleToggleExpandFolder}
        onUpdate={handleUpdateFolder}
        onToggleEdit={handleEditFolder}
        onAdd={handleAddFolder}
        onDelete={handleDeleteFolder}
      />

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

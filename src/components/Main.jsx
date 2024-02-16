// Hook/NPM package imports
//
import { useState } from "react";
import { useImmer } from "use-immer"; // Allows you to directly 'mutate' an object in state
import { v4 as uuidv4 } from "uuid";

// Component imports
//
import NoteEditor from "./NoteEditor";
import MarkdownDisplay from "./MarkdownDisplay";
import NotesPanel from "./NotesPanel";

import "../styles/main.css";

const Main = () => {
  // Uncomment line below to reset local storage for this app.
  localStorage.clear()

  // Returns the current full date and time.
  //
  const getCurrentDateAndTime = () => {
    return new Date().toLocaleString("default", {
      dateStyle: "full",
      timeStyle: "long",
    });
  }; // END getCurrentDateAndTime

  if (!localStorage.getItem("notes")) {
    const welcomeNote = [
      {
        id: uuidv4(),
        name: "Welcome!",
        text: "**Thank you for checking out this project!**\n\nQuickly create notes using Markdown and save them to your browser's local storage.\n\nMake sure to save your notes (floppy disk button) before closing the browser.\n\nThe green floppy disk button saves everything, whereas the non-coloured one saves only the selected note.",
        editing: false,
        created: getCurrentDateAndTime(),
      },
    ];

    localStorage.setItem("notes", JSON.stringify(welcomeNote));
  }

  const [notes, setNotes] = useImmer(JSON.parse(localStorage.getItem("notes")));

  // Holds the id of the currently selected note.
  //
  const [currentNoteId, setCurrentNoteId] = useState(notes[0].id);
  const [saves, setSaves] = useState(0);

  // When a user edits the title/text of a note, this method handles
  // the change of the title/text of the note.
  //
  const onChange = (event, noteIndex) => {
    const updatedNote = {
      ...notes[noteIndex],
      [event.target.name]: event.target.value,
    };

    setNotes((draft) => {
      draft[noteIndex] = updatedNote;
    });
  }; // END onChange

  // Select the note with the given id.
  //
  const handleChangeNote = (id) => {
    setCurrentNoteId(id);
  }; // END handleChangeNote

  // Handles the creation of a new note.
  //
  const handleCreateNote = () => {
    const newNoteId = uuidv4();

    setNotes([
      ...notes,
      {
        id: newNoteId,
        name: "Untitled",
        text: "",
        editing: true,
        created: getCurrentDateAndTime(),
        updated: getCurrentDateAndTime(),
      },
    ]);
    setCurrentNoteId(newNoteId);
  }; // END handleCreateNote

  // Handles the deletion of the currently selected note.
  //
  const handleDeleteNote = () => {
    const newNotes = notes.filter((note) => note.id != currentNoteId);
    setNotes(newNotes);

    if (currentNoteId == notes[0].id) {
      // If the first note in the list is selected
      if (notes.length == 1) {
        setNotes([
          {
            id: currentNoteId,
            name: "",
            text: "",
            created: getCurrentDateAndTime(),
            editing: true,
          },
        ]);
        setCurrentNoteId(currentNoteId);
      } else {
        setCurrentNoteId(notes[1].id);
      }
    } else {
      setCurrentNoteId(notes[0].id);
    }
  }; // END handleDeleteNote

  // Toggle a particular note for editing or for viewing in markdown.
  //
  const handleToggleNoteEdit = (noteIndex, editing) => {
    const updatedNote = { ...notes[noteIndex], editing: editing };
    setNotes((draft) => {
      draft[noteIndex] = updatedNote;
    });
  }; // END handleToggleNoteEdit

  // Saves the current note to the browser's local storage.
  //
  const handleSaveNote = (noteIndex) => {
    let localStorageData = JSON.parse(localStorage.getItem("notes"));
    localStorageData[noteIndex] = notes[noteIndex];
    localStorage.setItem("notes", JSON.stringify(localStorageData));
    setSaves(saves + 1); // Just to cause the page to re-render
  };

  const handleSaveAllNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
    setSaves(saves + 1); // Just to cause the page to re-render
  };

  // Get the index of the currently selected note.
  //
  const noteIndex = notes.findIndex((note) => note.id == currentNoteId);

  return (
    <main id="main">
      <NotesPanel
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
      </div>
    </main>
  );
};

export default Main;

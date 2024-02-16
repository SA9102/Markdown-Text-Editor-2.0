import { useMediaQuery } from "react-responsive";

const NotesPanel = ({
  notes,
  noteIndex,
  currentNoteId,
  onCreateNote,
  onDeleteNote,
  onSaveNote,
  onSaveAllNotes,
  onChangeNote,
  pageWrapId,
  outerContainerId,
}) => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 970px)" });

  const retrievedNotesFromStorage = JSON.parse(localStorage.getItem("notes"));

  // Renders the tabs of all available notes so that the user can
  // switch between them.
  //
  const notesTabs = notes.map((note, index) => (
    <li key={note.id} className="note-button-item">
      <button
        className={
          note.id == currentNoteId ? "note-button-selected" : "note-button"
        }
        onClick={() => onChangeNote(note.id)}
      >
        {note.name == "" ? "Untitled" : note.name}
      </button>
    </li>
  ));

  const notesPanelElements = (
    <div id="notes-panel">
      <div id="notes-panel-header">
        <button
          className="icon-button"
          id="button-create"
          onClick={onCreateNote}
        >
          <i className="fa fa-plus"></i>
        </button>
        <button
          className="icon-button"
          id="button-delete"
          onClick={onDeleteNote}
        >
          <i className="fa fa-trash"></i>
        </button>
        <button
          className="icon-button"
          id="button-save"
          onClick={() => onSaveNote(noteIndex)}
        >
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
        <button
          className="icon-button"
          id="button-save-all"
          onClick={onSaveAllNotes}
        >
          <i className="fa-solid fa-floppy-disk"></i>
        </button>
      </div>
      <ul id="notes-tabs">{notesTabs}</ul>
    </div>
  );

  return <>{notesPanelElements}</>;
};

export default NotesPanel;

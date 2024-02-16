import NoteNameInput from "./NoteNameInput";
import NoteTextInput from "./NoteTextInput";

const NoteEditor = ({ note, noteIndex, onChange }) => {
  return (
    <div id="name-and-text-input">
      <NoteNameInput
        name={note.name}
        noteId={note.id}
        noteIndex={noteIndex}
        onChange={onChange}
      ></NoteNameInput>
      <NoteTextInput
        text={note.text}
        noteId={note.id}
        noteIndex={noteIndex}
        onChange={onChange}
      ></NoteTextInput>
    </div>
  );
};

export default NoteEditor;

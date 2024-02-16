const NoteTextInput = ({ text, noteId, noteIndex, onChange }) => {
  return (
    <>
      <textarea
        name="text"
        id="text"
        placeholder="Empty"
        value={text}
        onChange={(event) => onChange(event, noteIndex)}
      ></textarea>
    </>
  );
};

export default NoteTextInput;

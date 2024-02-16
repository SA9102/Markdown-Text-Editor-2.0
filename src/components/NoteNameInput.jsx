const NoteNameInput = ({ name, noteId, noteIndex, onChange }) => {
  return (
    <>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        value={name}
        onChange={(event) => onChange(event, noteIndex)}
      />
    </>
  );
};

export default NoteNameInput;

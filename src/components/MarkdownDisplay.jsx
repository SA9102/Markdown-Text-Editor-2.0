import Markdown from "marked-react";

// Displays the
const MarkdownDisplay = ({ note }) => {
  return (
    <>
      <b id="name-display">{note.name}</b>
      <div id="markdown-display">
        <Markdown>{note.text}</Markdown>
      </div>
    </>
  );
};

export default MarkdownDisplay;

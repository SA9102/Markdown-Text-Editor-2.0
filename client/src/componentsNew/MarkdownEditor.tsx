import { Center, Text, Textarea } from "@mantine/core";

type MarkdownEditorProps = {
  isFileSelected: boolean;
  body: string;
  onChange: (arg0: string) => void;
};

const MarkdownEditor = ({ isFileSelected, body, onChange }: MarkdownEditorProps) => {
  return (
    <>
      <textarea className="editor" value={body} onChange={(e) => onChange(e.target.value)} />
    </>
  );
};

export default MarkdownEditor;

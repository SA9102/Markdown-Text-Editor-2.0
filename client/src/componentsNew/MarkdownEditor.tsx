type MarkdownEditorProps = {
  id: string;
  body: string;
  onChange: (arg0: string) => void;
};

const MarkdownEditor = ({ id, body, onChange }: MarkdownEditorProps) => {
  console.log('INSIDE MARKDOWN EDITOR');
  return (
    <>
      <textarea name="" id="" value={body} onChange={(e) => onChange(e.target.value)} />
    </>
  );
};

export default MarkdownEditor;

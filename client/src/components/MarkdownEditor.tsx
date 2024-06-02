type MarkdownEditorProps = {
  body: string;
  onChange: (arg0: string) => void;
};

const MarkdownEditor = ({ body, onChange }: MarkdownEditorProps) => {
  return <textarea className="editor" value={body} onChange={(e) => onChange(e.target.value)} />;
};

export default MarkdownEditor;

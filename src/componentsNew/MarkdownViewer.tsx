import Markdown from 'marked-react';

type MarkdownViewerProps = {
    body: string;
};

const MarkdownViewer = ({ body }: MarkdownViewerProps) => {
    return (
        <div className="markdown-viewer">
            <Markdown>{body}</Markdown>
        </div>
    );
};

export default MarkdownViewer;

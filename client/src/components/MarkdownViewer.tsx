// Mantine
import { Box } from "@mantine/core";

// Other third-party packages
import Markdown from "marked-react";

type MarkdownViewerProps = {
  body: string;
};

const MarkdownViewer = ({ body }: MarkdownViewerProps) => {
  return (
    <Box style={{ overflowY: "scroll" }} className="viewer" h="100%" p="sm">
      <Markdown>{body}</Markdown>
    </Box>
  );
};

export default MarkdownViewer;

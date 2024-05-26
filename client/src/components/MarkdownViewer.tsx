import { Box } from "@mantine/core";
import Markdown from "marked-react";

type MarkdownViewerProps = {
  body: string;
};

const MarkdownViewer = ({ body }: MarkdownViewerProps) => {
  return (
    <Box p="xs">
      <Markdown>{body}</Markdown>
    </Box>
  );
};

export default MarkdownViewer;

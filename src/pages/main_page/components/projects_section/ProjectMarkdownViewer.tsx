import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProjectMarkdown } from "../../../../content/projects";

interface ProjectMarkdownViewerProps {
  uniqueIdName: string;
}

export default function ProjectMarkdownViewer({ uniqueIdName }: ProjectMarkdownViewerProps) {
  const content = getProjectMarkdown(uniqueIdName);

  return (
    <div className="intro_desc">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

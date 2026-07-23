const modules = import.meta.glob("./*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const projectMarkdown: Record<string, string> = {};
for (const path in modules) {
  const key = path.replace("./", "").replace(".md", "");
  projectMarkdown[key] = modules[path];
}

export function getProjectMarkdown(uniqueIdName: string): string {
  return projectMarkdown[uniqueIdName] ?? "";
}

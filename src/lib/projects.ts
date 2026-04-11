import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  links?: {
    github?: string;
    live?: string;
  };
}

export interface ProjectMeta extends ProjectFrontmatter {
  slug: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export function getAllProjects(): ProjectMeta[] {
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith(".mdx"));
  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug, ...(data as ProjectFrontmatter) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProject(slug: string): {
  meta: ProjectMeta;
  content: string;
} | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    meta: { slug, ...(data as ProjectFrontmatter) },
    content,
  };
}

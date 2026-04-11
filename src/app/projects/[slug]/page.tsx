import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProject } from "@/lib/projects";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.meta.title} — Haritha Akkad`,
    description: project.meta.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { meta } = project;

  return (
    <div className="px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#projects"
          className="font-mono text-sm text-muted transition-colors hover:text-ink"
        >
          ← back to projects
        </Link>

        <div className="mt-10">
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-ink md:text-4xl">
            {meta.title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted">
            {meta.description}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <span className="font-mono text-xs text-faint">
              {new Date(meta.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
              })}
            </span>
            {meta.links?.github && (
              <a
                href={meta.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-amber transition-opacity hover:opacity-70"
              >
                GitHub ↗
              </a>
            )}
            {meta.links?.live && (
              <a
                href={meta.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-amber transition-opacity hover:opacity-70"
              >
                Live ↗
              </a>
            )}
          </div>
        </div>

        <hr className="my-10 border-border" />

        <div className="prose-portfolio">
          <MDXRemote source={project.content} />
        </div>
      </div>
    </div>
  );
}

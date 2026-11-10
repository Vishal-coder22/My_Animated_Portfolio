import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects, getProjectBySlug } from "@/lib/projects";
import ProjectDetail from "@/components/sections/ProjectDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} — Project`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Vishal Kumar Sharma`,
      description: project.description,
      type: "website",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}

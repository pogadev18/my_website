import type { Project } from '@prisma/client';
import ProjectCard from '@/root/components/projectCard';

export interface IProjectsListProps {
  projects: Project[];
}

function ProjectsList(props: IProjectsListProps) {
  const { projects } = props;

  return (
    <section className="grid grid-cols-3 gap-4">
      {projects?.map((project) => {
        return <ProjectCard isPreviewMode key={project.id} project={project} />;
      })}
    </section>
  );
}

export default ProjectsList;

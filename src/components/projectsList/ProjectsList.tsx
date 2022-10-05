import Link from 'next/link';
import type { Project } from '@prisma/client';

export interface IProjectsListProps {
  projects: Project[];
}

function ProjectsList(props: IProjectsListProps) {
  const { projects } = props;

  return (
    <section>
      {projects?.map(({ id, title, body, createdAt }) => {
        const date = createdAt.toString().split(' ');

        return (
          <article key={id}>
            <h2>
              <Link href={`/projects/${id}`}>{title}</Link>
            </h2>
            <p>{date[0]}</p>
            <p>{body}</p>
          </article>
        );
      })}
    </section>
  );
}

export default ProjectsList;

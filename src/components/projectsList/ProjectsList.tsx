import Link from 'next/link';

interface IProject {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  userId: string;
}

interface IPosts {
  projects: IProject[];
}

function ProjectsList({ projects }: IPosts) {
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

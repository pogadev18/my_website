import Link from "next/link";

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

function ProjectsList({projects}: IPosts) {
  return (
    <section>
      {projects?.map(({id, title, body}) => (
        <article key={id}>
          <h2><Link href={`/projects/${id}`}>{title}</Link></h2>
          <p>{body}</p>
        </article>
      ))}
    </section>
  )
}

export default ProjectsList
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@prisma/client';
import { useRouter } from 'next/router';
import { yearMonthDayFormat } from '@/root/utils/formatDates';

interface IProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: IProjectCardProps) => {
  const router = useRouter();

  const { id, title, createdAt, imageUrl } = project;

  const formattedDate = yearMonthDayFormat(createdAt);
  const month = formattedDate.toLocaleString('default', { month: 'long' });
  const dayOfTheMonth = formattedDate.getUTCDate();
  const year = formattedDate.getFullYear();

  const handleReadMore = () => router.push(`/projects/${id}`);

  return (
    <article className="relative bg-white rounded-lg border border-gray-200 shadow-md">
      <Link href={`/projects/${id}`}>
        <Image
          priority
          className="rounded-t-lg cursor-pointer"
          width="400px"
          height="400px"
          layout="responsive"
          src={imageUrl}
          alt={title}
        />
      </Link>
      <div className="p-5">
        <Link href={`/projects/${id}`}>
          <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-black">
            {title}
          </h5>
        </Link>
        <p className="text-sm text-gray-500">
          {month} {dayOfTheMonth}, {year}
        </p>
        <button
          type="button"
          onClick={handleReadMore}
          className="inline-flex items-center py-2 text-sm font-medium text-center text-black rounded-lg hover:underline focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          view more
          <svg
            aria-hidden="true"
            className="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </article>
  );
};

export default ProjectCard;

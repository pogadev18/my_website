import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@prisma/client';
import { useRouter } from 'next/router';
import { yearMonthDayFormat } from '@/root/utils/formatDates';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface IProjectCardProps {
  project: Project;
  isPreviewMode: boolean;
}

import styles from './ProjectCard.module.scss';
import projects from '@/root/pages/projects';

const ProjectCard = ({ project, isPreviewMode }: IProjectCardProps) => {
  const router = useRouter();

  const { id, title, createdAt, imageUrl } = project;

  const formattedDate = yearMonthDayFormat(createdAt);
  const month = formattedDate.toLocaleString('default', { month: 'long' });
  const dayOfTheMonth = formattedDate.getUTCDate();
  const year = formattedDate.getFullYear();

  const handleReadMore = () => router.push(`/projects/${id}`);

  // todo: extract in other component
  const ProjectImage = ({
    width,
    height,
    layoutMode,
    src,
    alt,
  }: {
    width: string;
    height: string;
    layoutMode: any;
    src: string;
    alt: string;
  }) => {
    return (
      <Image
        priority
        className="rounded-t-lg"
        width={width}
        height={height}
        layout={layoutMode}
        src={src}
        alt={alt}
      />
    );
  };

  return (
    <article
      className={`${styles.projectWrapper} relative bg-gray-50 dark:bg-gray-900 dark:text-white rounded-xl`}
    >
      {isPreviewMode ? (
        <Link href={`/projects/${id}`}>
          <a>
            <ProjectImage
              width="400px"
              height="400px"
              layoutMode="responsive"
              src={imageUrl}
              alt={title}
            />
          </a>
        </Link>
      ) : (
        <ProjectImage
          width="800px"
          height="600px"
          layoutMode="responsive"
          src={imageUrl}
          alt={title}
        />
      )}

      <div className="p-5">
        {isPreviewMode ? (
          <Link href={`/projects/${id}`}>
            <a>
              <h5 className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-black dark:text-white">
                {title}
              </h5>
            </a>
          </Link>
        ) : (
          <h1 className="mb-2 font-bold tracking-tight text-black dark:text-white">{title}</h1>
        )}

        <p className="text-sm text-gray-500 dark:text-gray-200">
          {month} {dayOfTheMonth}, {year}
        </p>
        {isPreviewMode && (
          <button
            type="button"
            onClick={handleReadMore}
            className="inline-flex items-center py-2 text-sm font-medium text-center text-black dark:text-white rounded-lg hover:underline focus:ring-4 focus:outline-none focus:ring-blue-300"
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
        )}
        {!isPreviewMode && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{project?.body}</ReactMarkdown>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;

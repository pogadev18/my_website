import type { Job } from '@prisma/client';
import Image from 'next/image';
import { FaBriefcase, FaMapMarkerAlt, FaRegCalendarAlt } from 'react-icons/fa';

import styles from './JobCard.module.scss';

interface IJobCard {
  job: Job;
}

// todo: replace svg icons with something from react-icons (copy wright problem maybe?)

const JobCard = ({ job }: IJobCard) => {
  const { imageUrl, position, commitment, description, startDate, endDate, location, companyName } =
    job;

  return (
    <div className={`${styles.job} flex gap-5 mb-10 pb-10 text-black dark:text-white`}>
      <div className="company-logo">
        <Image
          priority
          alt="Profile Picture"
          src={imageUrl}
          layout="fixed"
          width="50px"
          height="50px"
        />
      </div>

      <div className="job-details w-full">
        <header className="flex justify-between">
          <div>
            <p className="font-bold">{position}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400 flex gap-5">
              <p className="flex gap-1 items-center m-0">
                <FaBriefcase />
                {companyName}
              </p>
              <p className="flex gap-1 items-center m-0">
                <FaMapMarkerAlt />
                {location}
              </p>
            </div>
          </div>

          <div className="text-right text-gray-500 dark:text-gray-400 text-sm">
            <p className="bg-blue-800 px-2 text-white rounded-md inline-block">{commitment}</p>
            <p className="flex gap-1 items-center m-0">
              <FaRegCalendarAlt />
              {startDate} - {endDate}
            </p>
          </div>
        </header>
        <section className="mt-5 job-description">
          <p>{description}</p>
        </section>
      </div>
    </div>
  );
};

export default JobCard;

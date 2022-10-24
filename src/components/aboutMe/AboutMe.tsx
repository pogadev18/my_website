import { FaGithub, FaLinkedin } from 'react-icons/fa';

import styles from './AboutMe.module.scss';

// created this custom interface instead of the one from prisma client, I need just these values
interface IUser {
  email: string;
  description: string;
  githubLink: string;
  linkedInLink: string;
  workStatus: string;
}

interface IAboutMeProps {
  user: IUser | undefined | null;
}

const AboutMe = ({ user }: IAboutMeProps) => {
  return (
    <section className={`${styles.aboutMe} p-7 pb-4 text-black dark:text-white`}>
      <>
        <div className="flex justify-between items-center">
          <h2 className="text">About me</h2>
        </div>
        <div className="my-5">
          <p>{user?.description}</p>
          <br />
          <p className="text-blue-600 dark:text-blue-300">
            @&nbsp;<a href={`mailto:${user?.email}`}>{user?.email}</a>
          </p>
          <section className="flex gap-3 mt-5">
            <div>
              <a href={user?.githubLink} rel="noreferrer" target="_blank">
                <FaGithub size="25px" />
              </a>
            </div>
            <div>
              <a href={user?.linkedInLink} rel="noreferrer" target="_blank">
                <FaLinkedin size="25px" />
              </a>
            </div>
          </section>
        </div>
      </>
    </section>
  );
};

export default AboutMe;

import { FaGithub, FaLinkedin } from 'react-icons/fa';

import Navbar from '@/root/components/navbar';

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
    <section className={`${styles.aboutMe} shadow-md rounded-xl p-7 pb-4`}>
      <>
        <h2>About me</h2>
        <div className="text-gray-600 my-5">
          <p>{user?.description}</p>
          <br />
          <p className="text-blue-600">
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
        <Navbar />
      </>
    </section>
  );
};

export default AboutMe;

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { ICoreAreaUserProps } from '@/root/components/coreArea/MyInfo';

import styles from './AboutMe.module.scss';

const AboutMe = ({ user }: ICoreAreaUserProps) => {
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

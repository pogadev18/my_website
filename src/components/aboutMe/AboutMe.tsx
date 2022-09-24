import { FaGithub, FaLinkedin } from 'react-icons/fa';

import Navbar from "@/root/components/navbar";
import LoadingSpinner from "@/root/components/loadingSpinner";
import { trpc } from "@/root/utils/trpc";

import styles from './AboutMe.module.scss';

const AboutMe = () => {
  const {data: user, isLoading} = trpc.useQuery(['users.me']);

  return (
    <section className={`${styles.aboutMe} shadow-md rounded-xl p-7 pb-4`}>
      {isLoading ? <div className={styles.loadingSpinner}><LoadingSpinner/></div> : (
        <>
          <h2>About me</h2>
          <div className='text-gray-600 my-5'>
            <p>
              {user?.description}
            </p>
            <br/>
            <p className='text-blue-600'>@&nbsp;<a href='mailto:pogadev18@gmail.com'>{user?.email}</a></p>
            <ul className='flex gap-3 mt-5'>
              <li><a href={user?.githubLink} target='_blank'><FaGithub size='25px'/></a></li>
              <li><a href={user?.linkedInLink} target='_blank'><FaLinkedin size='25px'/></a></li>
            </ul>
          </div>
          <Navbar/>
        </>
      )}

    </section>
  );
};

export default AboutMe;
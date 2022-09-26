import { FaGithub, FaLinkedin } from 'react-icons/fa';

import Navbar from "@/root/components/navbar";
import { IUser } from "@/root/components/coreArea/CoreArea";

import styles from './AboutMe.module.scss';

const AboutMe = ({user}: IUser) => {
  // TODO: SSR Query

  return (
    <section className={`${styles.aboutMe} shadow-md rounded-xl p-7 pb-4`}>
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

    </section>
  );
};

export default AboutMe;
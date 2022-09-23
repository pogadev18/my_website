import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Navbar from "@/root/components/navbar";

const AboutMe = () => {
  return (
    <section className='aboutMe shadow-md rounded-xl p-7 pb-4'>
      <h2>About me</h2>
      <div className='text-gray-600 my-5'>
        <p>Hi, my name is Bogdan, I'm 27 years old and I'm a Front-End Engineer working in the IT industry for 6+ years.
          During this time I used my skills to develop web applications using the latest technologies and trends.
        </p>
        <br/>
        <p>My technical and soft skills helped me a lot to deliver successful projects, to create teams and communities
          of
          passionate Javascript developers, to adapt to any kind of situation / context and to have great conversations
          with my teammates and clients.
        </p>
        <br/>
        <p className='text-blue-600'>@&nbsp;<a href='mailto:pogadev18@gmail.com'>pogadev18@gmail.com</a></p>
        <ul className='flex gap-3 mt-4'>
          <li><a href='https://github.com/pogadev18' target='_blank'><FaGithub size='25px'/></a></li>
          <li><a href='https://www.linkedin.com/in/pogadev/' target='_blank'><FaLinkedin size='25px'/></a></li>
        </ul>
      </div>
      <Navbar/>
    </section>
  );
};

export default AboutMe;
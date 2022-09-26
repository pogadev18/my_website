import { ReactNode } from 'react';

import ProfileCard from "@/root/components/profileCard";
import AboutMe from "@/root/components/aboutMe";
import LoadingSpinner from "@/root/components/loadingSpinner";

import { trpc } from "@/root/utils/trpc";

interface IUserProps {
  email: string;
  description: string;
  githubLink: string;
  linkedInLink: string;
  workStatus: string;
}

// to be used in <ProfileCard> and <AboutMe>
export interface IUser {
  user: IUserProps | null | undefined
}

const CoreArea = ({children}: { children: ReactNode }) => {
  // TODO: think of another / better way to fetch this (maybe on the server)
  const {data: user, isLoading} = trpc.useQuery(['users.me']);

  if (isLoading) return <LoadingSpinner/>

  return (
    <section className='grid gap-5 lg:grid-cols-3'>
      <section className='left-column rounded-xl space-y-5'>
        <ProfileCard user={user}/>
      </section>
      <section className='right-column rounded-xl space-y-5 lg:col-span-2'>
        <AboutMe user={user}/>
        <section className='actual-routes'>{children}</section>
      </section>
    </section>
  );
};

export default CoreArea;
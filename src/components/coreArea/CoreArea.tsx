import { ReactNode } from 'react';

import ProfileCard from '@/root/components/profileCard';
import AboutMe from '@/root/components/aboutMe';
import LoadingSpinner from '@/root/components/loadingSpinner';

import { useUser } from '@/root/hooks/useUser';

interface IUserProps {
  email: string;
  description: string;
  githubLink: string;
  linkedInLink: string;
  workStatus: string;
}

// to be used in <ProfileCard> and <AboutMe>
export interface IUser {
  user: IUserProps | null | undefined;
}

const CoreArea = () => {
  const { user, isUserLoading, isError } = useUser();

  if (isUserLoading) return <LoadingSpinner />;

  if (isError) {
    return <p>something went wrong....</p>;
  }

  return (
    <section className="grid gap-5 lg:grid-cols-3">
      <section className="left-column rounded-xl space-y-5">
        <ProfileCard workStatus={user?.workStatus} />
      </section>
      <section className="right-column rounded-xl space-y-5 lg:col-span-2">
        <AboutMe user={user} />
      </section>
    </section>
  );
};

export default CoreArea;

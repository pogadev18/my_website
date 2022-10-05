import ProfileCard from '@/root/components/profileCard';
import AboutMe from '@/root/components/aboutMe';
import LoadingSpinner from '@/root/components/loadingSpinner';

import { useUser } from '@/root/hooks/useUser';

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

import ProfileCard from '@/root/components/profileCard';
import AboutMe from '@/root/components/aboutMe';

// created this custom interface instead of the one from prisma client, I need just these values
export interface IUser {
  email: string;
  description: string;
  githubLink: string;
  linkedInLink: string;
  workStatus: string;
}

export interface ICoreAreaUserProps {
  user: IUser | undefined | null;
}

const MyInfo = ({ user }: ICoreAreaUserProps) => {
  return (
    <section className="grid gap-5 lg:grid-cols-3 mb-10">
      <section className="left-column shadow rounded-xl space-y-5 bg-white dark:bg-gray-800">
        <ProfileCard workStatus={user?.workStatus} />
      </section>
      <section className="right-column shadow rounded-xl space-y-5 lg:col-span-2 bg-white dark:bg-gray-800">
        <AboutMe user={user} />
      </section>
    </section>
  );
};

export default MyInfo;

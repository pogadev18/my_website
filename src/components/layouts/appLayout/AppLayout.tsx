import CoreArea from '@/root/components/coreArea';
import Navbar from '@/root/components/navbar';

const AppLayout = () => {
  return (
    <>
      <main className="appLayout mx-auto max-w-6xl pt-10">
        <Navbar />
        <CoreArea />
      </main>
    </>
  );
};

export default AppLayout;

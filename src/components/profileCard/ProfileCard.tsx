import Image from 'next/image';

import styles from './ProfileCard.module.scss';

const ProfileCard = ({ workStatus }: { workStatus: string | undefined }) => {
  return (
    <article className="shadow-md rounded-xl overflow-hidden">
      <header className={styles.header} />
      <div className="pt-14 p-7 bg-white relative">
        <div className={`shadow ${styles.profileImage}`}>
          <Image
            priority
            alt="Profile Picture"
            src="https://gbcumhglvcigfylcfycr.supabase.co/storage/v1/object/sign/my-website-files/me.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS13ZWJzaXRlLWZpbGVzL21lLnBuZyIsImlhdCI6MTY2MzkyMTQ5OCwiZXhwIjoxOTc5MjgxNDk4fQ.tAGNFQW0D_J3Cy_xpUieBxHnRcpQ2dQEz13vZy3EpcQ"
            layout="fixed"
            width="100px"
            height="100px"
          />
        </div>
        <span className={styles.statusPill}>{workStatus}</span>
        <p className="text-lg font-semibold">Bogdan Pogăcean</p>
        <p className="text-sm text-gray-400 mb-7">Senior Front-End Engineer</p>
        <div className="flex group">
          <button className="transition ease-in-out grow bg-red-600 hover:bg-red-800 text-white p-3 rounded-tl-xl rounded-bl-xl">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://gbcumhglvcigfylcfycr.supabase.co/storage/v1/object/sign/my-website-files/CV_Bogdan_Pogacean.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJteS13ZWJzaXRlLWZpbGVzL0NWX0JvZ2Rhbl9Qb2dhY2Vhbi5wZGYiLCJpYXQiOjE2NjM5MjY2MzksImV4cCI6MTk3OTI4NjYzOX0.cyNbnhcwY0O75axiNEqrWTr32ibnKcUmfrtyfyc2UGI"
            >
              Download CV
            </a>
          </button>
          <button className="bg-red-800 text-white p-3 rounded-tr-xl rounded-br-xl">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProfileCard;

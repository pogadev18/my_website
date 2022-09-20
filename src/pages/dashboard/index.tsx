import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "@/root/common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return {props: {}};
});

const Dashboard: NextPage = () => {
  const {data} = useSession();

  return (
    <div>
      <div>
        <div>
          <h1>
            You are logged in!
          </h1>
          <p className="my-4 text-center leading-loose">
            You are allowed to visit this page because you have a session,
            otherwise you would be redirected to the login page.
          </p>
          <div>
            <pre>
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
          <div className="text-center">
            <button
              onClick={() => signOut({callbackUrl: "/"})}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
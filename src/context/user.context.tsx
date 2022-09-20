import { createContext, ReactNode, useContext } from "react";
import { inferProcedureOutput } from "@trpc/server";

import { AppRouter } from "@/root/server/routes/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];
type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>

const UserContext = createContext<InferQueryOutput<'users.me'>>(null);

interface IUserContextProviderParameters {
  children: ReactNode;
  value: InferQueryOutput<'users.me'> | undefined
}

function UserContextProvider({children, value}: IUserContextProviderParameters) {
  return <UserContext.Provider value={value || null}>
    {children}
  </UserContext.Provider>
}

const useUserContext = () => useContext(UserContext);

export {useUserContext, UserContextProvider};
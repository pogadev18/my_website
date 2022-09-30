import { trpc } from "@/root/utils/trpc";

export function useUser() {
  const {data: user, isLoading: isUserLoading, isError} = trpc.useQuery(['users.me']);


  return {user, isUserLoading, isError}
}
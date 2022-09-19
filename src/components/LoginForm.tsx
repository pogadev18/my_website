import { useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CreateUserInput } from "@/root/schema/user.schema";
import { trpc } from "@/root/utils/trpc";

function VerifyToken({hash}: { hash: string }) {
  const router = useRouter();
  const {data, isLoading} = trpc.useQuery(['users.verify-otp', {hash}])

  if (isLoading) return <p>verifying...</p>

  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/')
  return <p>Redirecting...</p>
}

function LoginForm() {
  const {handleSubmit, register} = useForm<CreateUserInput>()
  const router = useRouter();
  const [success, setSuccess] = useState(false)

  const {mutate, error} = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => setSuccess(true)
  });

  function onSubmit(values: CreateUserInput) {
    mutate({...values, redirect: router.asPath});
  }

  const tokenHash = router.asPath.split('#token=')[1];

  if (tokenHash) return <VerifyToken hash={tokenHash}/>

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {success && <p>check your email</p>}
        <h1>Login</h1>

        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register('email')}
        />
        <button type="submit">Login</button>
      </form>

      <Link href="/register">Register</Link>
    </>
  )
}

export default LoginForm;
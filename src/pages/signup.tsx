import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { signUpSchema, ISignUp } from "@/root/schema/user.schema";
import { trpc } from "@/root/utils/trpc";

function SignupPage() {
  const {handleSubmit, register, formState: {errors}} = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema)
  })
  const router = useRouter();

  const {mutate, error} = trpc.useMutation(['users.register-user'], {
    onSuccess: () => router.push('/login')
  });

  function onSubmit(values: ISignUp) {
    mutate(values);
  }

  return (
    <>
      <Head>
        <title>PogaDev - Register</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Type your username..."
          {...register("name")}
        />
        <p>{errors.name && errors.name.message}</p>
        <br/>
        <input
          type="email"
          placeholder="Type your email..."
          {...register("email")}
        />
        <p>{errors.email && errors.email.message}</p>
        <br/>
        <input
          type="password"
          placeholder="Type your password..."
          {...register("password")}
        />
        <p>{errors.password && errors.password.message}</p>
        <button type="submit">SignUp</button>
      </form>

      <Link href="/login">Login</Link>
    </>
  )
}

export default SignupPage;
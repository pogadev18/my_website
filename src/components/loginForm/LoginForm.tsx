import Head from "next/head";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, ILogin } from "@/root/schema/user.schema";

const LoginForm = () => {
  const {register, handleSubmit, formState: {errors}} = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn("credentials", {...data, callbackUrl: "/dashboard"});
  }, []);

  return (
    <section>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="email"
          placeholder="Type your email..."
          {...register("email")}
        />
        <p>{errors.email && errors.email.message}</p>
        <input
          type="password"
          placeholder="Type your password..."
          {...register("password")}
        />
        <p>{errors.password && errors.password.message}</p>
        <div>
          <button className="btn btn-secondary" type="submit">
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
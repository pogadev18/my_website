import Head from 'next/head';
import { useCallback } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, ILogin } from '@/root/schema/user.schema';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(async (data: ILogin) => {
    await signIn('credentials', { ...data, callbackUrl: '/' });
  }, []);

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
          placeholder="Type your email..."
          {...register('email')}
        />
        <p>{errors.email && errors.email.message}</p>
        <br />
        <label htmlFor="pass" className="block mb-2 text-sm font-medium">
          Password
        </label>
        <input
          id="pass"
          type="password"
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
          placeholder="Type your password..."
          {...register('password')}
        />
        <p>{errors.password && errors.password.message}</p>
        <br />
        <div>
          <button
            type="submit"
            className="transition ease-in-out grow bg-amber-600 hover:bg-red-800 py-2 px-4 rounded"
          >
            Access CMS
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import LoadingSpinner from '@/root/components/loadingSpinner';
import { IUpdate, updateUserSchema } from '@/root/schema/user.schema';
import { trpc } from '@/root/utils/trpc';
import { useUser } from '@/root/hooks/useUser';

function UpdateUserInfoForm() {
  const { user, isUserLoading } = useUser();
  const trpcContext = trpc.useContext();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IUpdate>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: user?.email,
      password: '',
      name: user?.name,
      description: user?.description,
      githubLink: user?.githubLink,
      linkedInLink: user?.linkedInLink,
      workStatus: user?.workStatus,
    },
  });

  const { mutate: updateUser, isLoading: isUpdatingUser } = trpc.useMutation(
    ['users.update-user'],
    {
      onSuccess: async () => {
        await trpcContext.invalidateQueries(['users.me']);
        reset();
      },
    },
  );

  function onSubmit(values: IUpdate) {
    updateUser(values);
  }

  if (isUserLoading || isUpdatingUser) return <LoadingSpinner />;

  return (
    <>
      <form className="w-2/3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-3 mb-10">
          <div className="flex-1">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              disabled
              type="email"
              id="email"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block p-2.5"
              placeholder="email"
              {...register('email')}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="workStatus" className="block mb-2 text-sm font-medium">
              Work Status
            </label>
            <input
              type="text"
              id="workStatus"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="work status..."
              {...register('workStatus')}
            />
            {errors.workStatus && <p>{errors.workStatus.message}</p>}
          </div>
        </div>
        <div className="flex gap-3 mb-10">
          <div className="flex-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name..."
              {...register('name')}
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="desc" className="block mb-2 text-sm font-medium">
              Description
            </label>
            <textarea
              id="desc"
              className="h-36 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="description..."
              {...register('description')}
            />
            {errors.description && <p>{errors.description.message}</p>}
          </div>
        </div>
        <div className="flex gap-3 mb-10">
          <div className="flex-1">
            <label htmlFor="ghLink" className="block mb-2 text-sm font-medium">
              GitHub Link
            </label>
            <input
              type="text"
              id="ghLink"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="github link..."
              {...register('githubLink')}
            />
            {errors.githubLink && <p>{errors.githubLink.message}</p>}
          </div>
          <div className="flex-1">
            <label htmlFor="lilink" className="block mb-2 text-sm font-medium">
              LinkedIn Link
            </label>
            <input
              type="text"
              id="lilink"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="linkedin link..."
              {...register('linkedInLink')}
            />
            {errors.linkedInLink && <p>{errors.linkedInLink.message}</p>}
          </div>
        </div>
        <div className="flex gap-3 mb-10">
          <div className="flex-1">
            <label htmlFor="ghLink" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="pass"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="password..."
              {...register('password')}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
        </div>
        <button
          type="submit"
          className="transition ease-in-out grow bg-amber-600 hover:bg-red-800 text-white py-2 px-4 rounded"
        >
          Update info
        </button>
      </form>
    </>
  );
}

export default UpdateUserInfoForm;

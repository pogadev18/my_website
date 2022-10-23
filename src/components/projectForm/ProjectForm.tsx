import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';

import LoadingSpinner from '@/root/components/loadingSpinner';

import { PostInput, projectSchema } from '@/root/schema/project.schema';
import { trpc } from '@/root/utils/trpc';

function ProjectForm() {
  const trpcContext = trpc.useContext();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PostInput>({
    resolver: zodResolver(projectSchema),
  });

  const { mutate, isLoading } = trpc.useMutation(['projects.create-project'], {
    onSuccess: async () => {
      await trpcContext.invalidateQueries(['projects.projects']);
      await router.push(`/projects`);
    },
  });

  function onSubmit(values: PostInput) {
    mutate(values);
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="project_title" className="block mb-2 text-sm font-medium">
            Project title
          </label>
          <input
            type="text"
            id="project_title"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
            placeholder="Project title..."
            {...register('title')}
          />
          {errors.title && <p>{errors.title.message}</p>}
          <br />
          <label htmlFor="post_body" className="block mb-2 text-sm font-medium">
            Project description
          </label>

          <textarea
            id="post_body"
            rows={4}
            className="block p-2.5 w-1/2 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Project description..."
            {...register('body')}
          />
          {errors.body && <p>{errors.body.message}</p>}
          <br />
          <label htmlFor="project_img" className="block mb-2 text-sm font-medium">
            Project image
          </label>
          <input
            type="text"
            id="project_img"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
            placeholder="Project image..."
            {...register('imageUrl')}
          />
          {errors.imageUrl && <p>{errors.imageUrl.message}</p>}
          <br />
          <button
            type="submit"
            className="transition ease-in-out grow bg-amber-600 hover:bg-red-800 py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      )}
    </>
  );
}

export default ProjectForm;

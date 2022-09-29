import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import LoadingSpinner from "@/root/components/loadingSpinner";

import { UpdatePostInput } from "@/root/schema/post.schema";
import { trpc } from "@/root/utils/trpc";

interface IUpdateProjectForm {
  projectId: string;
  defaultValues: {
    title: string;
    body: string;
  }
}

const UpdateProjectForm = ({projectId, defaultValues}: IUpdateProjectForm) => {
  const router = useRouter();
  const trpcContext = trpc.useContext();
  const {handleSubmit, register} = useForm<UpdatePostInput>({
    defaultValues
  })

  // TODO: refactor duplicated code
  const {mutate: updatePost, isLoading: isUpdatingPost} = trpc.useMutation(['projects.update-project'], {
    onSuccess: async () => {
      await trpcContext.invalidateQueries(['projects.projects']);
      await trpcContext.invalidateQueries(['projects.single-project'])
      await router.push('/projects');
    }
  })
  const {mutate: deletePost, isLoading: isDeletingPost} = trpc.useMutation(['projects.delete-project'], {
    onSuccess: async () => {
      await trpcContext.invalidateQueries(['projects.projects']);
      await trpcContext.invalidateQueries(['projects.single-project'])
      await router.push('/projects');
    }
  });

  function onSubmit(values: UpdatePostInput) {
    const data = {
      projectId,
      title: values.title,
      body: values.body
    }

    updatePost(data)
  }

  const deletePostHandler = () => {
    deletePost({projectId});
  }

  // TODO: try https://github.com/jlalmes/trpc-openapi

  return (
    <>
      {isUpdatingPost || isDeletingPost ? <LoadingSpinner/> : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="project_title" className="block mb-2 text-sm font-medium">Project title</label>
          <input
            type="text"
            id="project_title"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="post title..."
            {...register('title')}
          />
          <br/>
          <label htmlFor="post_body" className="block mb-2 text-sm font-medium">Project description</label>
          <textarea
            id="post_body"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Project description..."
            {...register('body')}
          />
          <div className='flex gap-3 mt-5 mb-10'>
            <button
              type='submit'
              className='transition ease-in-out grow bg-amber-600 hover:bg-red-800 text-white py-2 px-4 rounded'>
              Update project
            </button>
            <button
              type='button'
              onClick={deletePostHandler}
              className='transition ease-in-out grow bg-red-800 hover:bg-red-500 text-white py-2 px-4 rounded'>
              delete project
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UpdateProjectForm;
import { useForm } from "react-hook-form";

import { UpdatePostInput } from "@/root/schema/post.schema";
import { trpc } from "@/root/utils/trpc";
import LoadingSpinner from "@/root/components/loadingSpinner";

interface IUpdateProjectForm {
  projectId: string;
  defaultValues: {
    title: string;
    body: string;
  }
}

const UpdateProjectForm = ({projectId, defaultValues}: IUpdateProjectForm) => {
  const {handleSubmit, register} = useForm<UpdatePostInput>({
    defaultValues
  })

  const {mutate: updatePost, isLoading} = trpc.useMutation(['projects.update-project'])

  function onSubmit(values: UpdatePostInput) {
    const data = {
      projectId,
      title: values.title,
      body: values.body
    }

    updatePost(data)
  }

  // TODO: Invalidate post queries after mutations
  // TODO: try https://github.com/jlalmes/trpc-openapi

  return (
    <>
      {isLoading ? <LoadingSpinner/> : (
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
          <button
            type='submit'
            className='transition ease-in-out grow bg-amber-600 hover:bg-red-800 text-white py-2 px-4 rounded'>
            Update project
          </button>
        </form>
      )}
    </>
  );
};

export default UpdateProjectForm;
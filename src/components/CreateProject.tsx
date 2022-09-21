import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { CreatePostInput } from "@/root/schema/post.schema";
import { trpc } from "@/root/utils/trpc";

function CreateProject() {
  const {handleSubmit, register} = useForm<CreatePostInput>()
  const router = useRouter()

  const {mutate, isLoading, error} = trpc.useMutation(['posts.create-post'], {
    onSuccess: ({id}) => router.push(`/posts/${id}`)
  });

  function onSubmit(values: CreatePostInput) {
    mutate(values)
  }

  return (
    <>
      <h3>Create project</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Your post title" {...register('title')} />
        <br/>
        <textarea placeholder="Your post title" {...register('body')} />
        <br/>
        <button>Create post</button>
      </form>
      {error && error?.message}
      {isLoading && <p>creating post...</p>}
    </>
  )
}

export default CreateProject;
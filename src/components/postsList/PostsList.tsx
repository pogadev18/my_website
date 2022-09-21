import Link from "next/link";

interface IPost {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  userId: string;
}

interface IPosts {
  posts: IPost[];
}

function PostsList({posts}: IPosts) {
  return (
    <section>
      {posts?.map((post) => (
        <article key={post?.id}>
          <h2><Link href={`/posts/${post?.id}`}>{post?.title}</Link></h2>
          <p>{post?.body}</p>
        </article>
      ))}
    </section>
  )
}

export default PostsList
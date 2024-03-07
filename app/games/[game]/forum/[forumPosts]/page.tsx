export default function Page({ params }: { params: { forumPosts: string } }) {

  return (
  <div>
    <h1>Forum post: {params.forumPosts}</h1>
    <div>Forum message: {params.forumPosts}</div>;
  </div>
  )
}

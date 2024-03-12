/**
 * A specific forum post for a specific game. Pulls the forum comment data from database that are linked to the original post.
 */

export default function Page({ params }: { params: { forumPosts: string } }) {

  return (
  <div>
    <h1>Forum post: {params.forumPosts}</h1>
    <div>Forum message: {params.forumPosts}</div>;
  </div>
  )
}

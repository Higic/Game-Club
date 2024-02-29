export default function Page({ params }: { params: { forumPosts: string } }) {
  return <div>My Post: {params.forumPosts}</div>
}
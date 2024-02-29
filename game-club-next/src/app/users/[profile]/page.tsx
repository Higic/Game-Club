export default function Page({ params }: { params: { profile: string } }) {
  return <div>My Post: {params.profile}</div>
}
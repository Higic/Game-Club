export default function Page({ params }: { params: { profile: string } }) {
  return (
    <div>
      <h1>Profile: {params.profile}</h1>
      <div>Profile content: {params.profile}</div>
    </div>
  );
}

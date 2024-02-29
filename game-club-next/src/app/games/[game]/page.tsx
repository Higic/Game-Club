export default function Page({ params }: { params: { game: string } }) {
  return <div>
    <h1>Game # {params.game}</h1>
    This game is the game.
    </div>
}
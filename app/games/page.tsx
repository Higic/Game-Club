"use client";

import { GET_ALL_GAMES } from "../api/graphql/queries/gameQueries"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/navigation";
import { Game } from "./[game]/page";

/**
 * The main page for all games
 * @returns all games in an array
 */
function Games () {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_ALL_GAMES); 
  return (
    <div>
      <h2>Games</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.games.map((game: any) => (
        <div key={game.id} className="post gamePost" onClick={() => router.push(`/games/${game.id}`)}>
          <Game gameId={game.id}></Game>
        </div>
      ))}
    </div>
  );
}

/**
 * The main page for all games, displays the Games component inside
 * @returns the Games component
 */
export default function GamePage() {
  return (
    <div>
      <div>
        <h1>Would you rather have games?!</h1>
      </div>
      <div>
        <Games />
      </div>
    </div>
  )
}
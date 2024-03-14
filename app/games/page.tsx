"use client";

import { GET_ALL_GAMES, GET_GAME_BY_ID } from "../api/graphql/queries/gameQueries"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/navigation";

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
 * This function is used to display a game by its id
 * @param gameId game id from database
 * @returns Game component to be displayed on the page
 */
function Game({ gameId }: { gameId: string }) {
  const { loading, error, data } = useQuery(GET_GAME_BY_ID, {
    variables: { gameById: gameId },
  });
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="post">
          <h2>{data.gameById.gameName} </h2>
          <p>publisher: {data.gameById.publisher} </p>
          <p>genre: {data.gameById.genre}</p>
        </div>
      )}
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
      </div>
      <div>
        <Games />
      </div>
    </div>
  )
}
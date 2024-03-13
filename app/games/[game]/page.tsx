"use client";

import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { useQuery } from "@apollo/client";

export function Game({ gameId }: { gameId: string }) {
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

export default function Page({ params }: { params: { game: string } }) {
  return (
    <div>
      <Game gameId={params.game} />
    </div>
  );
}

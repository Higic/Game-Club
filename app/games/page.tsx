"use client";

import { GET_ALL_GAMES } from "../api/graphql/queries/gameQueries"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/navigation";


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
          <p>name: {game.gameName}, </p>
          <p>publisher: {game.publisher}, </p>
          <p>genre: {game.genre}</p>
        </div>
      ))}
    </div>
  );
}


export default function HomePage() {




  
  
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
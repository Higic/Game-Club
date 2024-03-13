'use client';

import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { GET_LFG_BY_GAME } from "@/app/api/graphql/queries/lfgQueries";
import { LFG } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

function GetGameById(game: string) {
    // game variable is the name of the game
    const { loading, error, data } = useQuery(GET_GAME_BY_ID, {
        variables: { gameById: game }
    });
    if (data) {
        return data;
    }
}

export default function LfgPost() {

  const [gameId, setGameId] = useState("Metal Gear Rising 2 - Revengeance");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const game = pathParts[2];
    setGameId(game);
  }, []);

  const gameData = GetGameById(gameId);
  const name = gameData?.gameById.gameName;

  const { loading, error, data } = useQuery(GET_LFG_BY_GAME, {
    variables: { lfgByGame: gameId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div> 
      <h2>LFG posts for {name}</h2>
      {data && data.lfgByGame.map((lfg: LFG) => (
        <div className="post" key={lfg.id}>
          <div className="postProfile">
            <p>{lfg.author}</p>
          </div>
          <div className="postData">
            <p>{lfg.text}</p>
          </div>
          <div className="postButton">
            <button>Join</button>
          </div>
        </div>
        ))}
    </div>
  );
}

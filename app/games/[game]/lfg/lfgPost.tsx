'use client';

import { DELETE_LFG_MUTATION } from "@/app/api/graphql/mutations/lfgMutations";
import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { GET_LFG_BY_GAME } from "@/app/api/graphql/queries/lfgQueries";
import { LFG } from "@/types/DBTypes";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GetLoggedInUser from "@/components/getLoggedInUser";

/**
 * Function to get game by game id
 */
function GetGameById(game: string) {
  // game variable is the name of the game
  const { loading, error, data } = useQuery(GET_GAME_BY_ID, {
    variables: { gameById: game }
  });
  if (data) {
      return data;
  }
}

/**
 * Component for the LFG posts
 */
export default function LfgPost() {
  const [deleteLfgMutation, { loading: deleteLfgLoading, error: deleteLfgError }] = useMutation(DELETE_LFG_MUTATION);

  // Get the game name from the URL and set to gameId
  const [gameId, setGameId] = useState("");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/");
    const game = pathParts[2];
    setGameId(game);
  }, []);
  const user = GetLoggedInUser();
  const router = useRouter();
  const handleDelete = async (id: string) => {
    try {
      const data = await deleteLfgMutation({
        variables: { deleteLfgId: id }
      });
      if (data) {
        console.log("LFG post deleted: ", data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    router.refresh();
  }
  // Get the game data
  const gameData = GetGameById(gameId);
  const name = gameData?.gameById.gameName;

  // Get all LFG posts for the game
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
          {lfg.author === user?.user_name && (
          <div className="postButton">
            <button onClick={() => handleDelete(lfg.id as string)}>Delete</button>
          </div>
          )}
        </div>
        ))}
    </div>
  );
}

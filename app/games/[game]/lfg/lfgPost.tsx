'use client';

import { GET_LFG_BY_GAME } from "@/app/api/graphql/queries/lfgQueries";
import { LFG } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";
import { useState } from "react";

export default function LfgPost() {

  const [gameName, setGameName] = useState("Metal Gear Rising 2 - Revengeance");
  const { loading, error, data } = useQuery(GET_LFG_BY_GAME, {
    variables: { lfgByGame: gameName }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      {data && data.lfgByGame.map((lfg: LFG) => (
        <div className="post" key={lfg.id}>
          <div className="postProfile">
            <p>{lfg.author}</p> {/* Author of LFG post */}
          </div>
          <div className="postData">
            <p>{lfg.text}</p> {/* LFG post content */}
          </div>
          <div className="postButton">
            <button>Join</button>
          </div>
        </div>
        ))}
    </div>
  );
}

import { useState } from "react";
import LfgPost from "./lfgPost";
import LfgPostForm from "@/app/games/[game]/lfg/LfgPostForm";
import { useQuery } from "@apollo/client";
import { GET_LFG_BY_GAME } from "@/app/api/graphql/queries/lfgQueries";

export default function Page() {

  return (
    <div>
      <LfgPostForm/>
      <LfgPost/>
    </div>
  );
}

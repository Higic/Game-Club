import LfgPost from "./lfgPost";
import LfgPostForm from "@/app/games/[game]/lfg/LfgPostForm";

export default function Page() {
  return (
    <div>
      <LfgPostForm/>
      <LfgPost
        user_name={"Timoteijus"}
        text={"Looking for a group to play with"}
      />
      <LfgPost
        user_name={"xxdemonslayer69xx"}
        text={"DID YOU KNOW THAT IN TERMS OF POKEMON AND HUMAN"}
      />
    </div>
  );
}

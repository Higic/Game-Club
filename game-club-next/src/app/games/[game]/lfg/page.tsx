import LfgPost from "./lfgPost";

export default function Page() {
  return (
    <div>
      <form action="" className="lfgInput">
        <textarea
          rows={4}
          maxLength={100}
          placeholder="Make a post..."
        ></textarea>
        <div className="reviewInputCol">
          <div></div>
          <input type="submit" value="Submit" className="lfgSubmit"></input>
        </div>
      </form>
      <LfgPost
        username={"Timoteijus"}
        text={"Looking for a group to play with"}
      />
      <LfgPost
        username={"xxdemonslayer69xx"}
        text={"DID YOU KNOW THAT IN TERMS OF POKEMON AND HUMAN"}
      />
    </div>
  );
}

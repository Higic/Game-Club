import LfgPostForm from "./LfgPostForm";
import LfgPost from "./lfgPost";


export default function Page() {

  return (
    <div>
      <LfgPostForm/>
      <div className="mainContent">
        <LfgPost/>
      </div>
    </div>
  );
}

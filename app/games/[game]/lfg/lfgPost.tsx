export default function LfgPost(props: { username: string; text: string; }) {
    const { username, text} = props;
  return (
    <div className="post">
      <div className="postProfile">
        <p>{username}</p>
      </div>
      <div className="postData">
        <p>{text}</p>
      </div>
      <div className="postButton">
        <button>Join</button>
      </div>
    </div>
  );
}

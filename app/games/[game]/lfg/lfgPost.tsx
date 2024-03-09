export default function LfgPost(props: { user_name: string; text: string; }) {
    const { user_name, text} = props;
  return (
    <div className="post">
      <div className="postProfile">
        <p>{user_name}</p>
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

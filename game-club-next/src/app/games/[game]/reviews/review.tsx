export default function Review(props: { username: string; review: string; rating: number; }) {
    const { username, review, rating } = props;
  return (
    <div className="post">
      <div className="postProfile">
        <p>{username}</p>
      </div>
      <div className="postData">
        <p>{review}</p>
        <p>Rating: {rating}/5</p>
      </div>
    </div>
  );
}

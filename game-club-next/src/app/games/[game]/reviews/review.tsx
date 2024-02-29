export default function Review(props: { username: string; review: string; rating: number; }) {
    const { username, review, rating } = props;
  return (
    <div className="review">
      <div className="profileData">
        <p>{username}</p>
      </div>
      <div className="reviewData">
        <p>{review}</p>
        <p>Rating: {rating}/5</p>
      </div>
    </div>
  );
}

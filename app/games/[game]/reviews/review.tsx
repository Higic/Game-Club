/**
 * The Review component is used to display a review of a game. It is called from its parent component, ReviewPage.
 * @param props Review data, includig author name, review text and rating
 */

export default function Review(props: { user_name: string; review: string; rating: number; }) {
  
  const { user_name, review, rating } = props;

  return (
    <div className="post">
      <div className="postProfile">
        <p>{user_name}</p>
      </div>
      <div className="postData">
        <p>{review}</p>
        <p>Rating: {rating}/5</p>
      </div>
    </div>
  );
}

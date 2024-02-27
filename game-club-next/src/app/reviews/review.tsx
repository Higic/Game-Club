import Image from "next/image";

export default function Review(props: { imgUrl: string; username: string; review: string; rating: number; }) {
    const { imgUrl, username, review, rating } = props;
  return (
    <div className="review">
      <div className="profileData">
        <Image src={imgUrl} alt="profile picture"></Image>
        <p>{username}</p>
      </div>
      <div className="reviewData">
        <p>{review}</p>
        <p>{rating}</p>
      </div>
    </div>
  );
}

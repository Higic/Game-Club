import Review from "./review";

export default async function HomePage() {
  return (
    <div>
      <div className="mainContent">
        <Review
          imgUrl={""}
          username={"Testerino"}
          review={"Tässä vähän testiarvosteluu, en tykänny mut maistu hyvält."}
          rating={5}
        ></Review>
      </div>
    </div>
  );
}

import connectMongo from "@/utils/db";

export default function HomePage() {
  
  return (
    <div className="homePageIntro">
        <h1>Welcome to Game Club!</h1>
        <p>Use the search bar to find the game you are looking for</p>
    </div>
  )
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        JWT_SECRET: "supersecret",
        AUTH_URL: "game-club-auth-server.azurewebsites.net",
        DATABSE_URL: "mongodb+srv://tapiojh:HSJ1cKTvvA1qQfgM@game-club.405k6xl.mongodb.net/?retryWrites=true&w=majority&appName=game-club",
    }
}

module.exports = nextConfig

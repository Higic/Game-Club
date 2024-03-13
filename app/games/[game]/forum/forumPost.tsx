"use client";
import { GET_FORUM_POSTS_BY_GAME } from "@/app/api/graphql/queries/forumPostQueries";
import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { ForumPost } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";


/**
 * Queries a certain game by its name
 * @param game Game name
 * @returns all data for a game
 */
function GetGameById(game: string) {

    const { loading, error, data } = useQuery(GET_GAME_BY_ID, {
        variables: { gameById: game }
    });
    if (data) {
        return data;
    }
}


/**
 * Component queries and displays all forum posts for a certain game
 * @returns all forum posts for a certain game
 */
export default function GetForumPost() {

    // Game id
    const [gameId, setGame] = useState("");

    // Get the game name from the URL and set to gameId
    useEffect(() => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const game = pathParts[2];
        setGame(game);
    }, []);

    // Get the game data
    const gameData = GetGameById(gameId);
    const name = gameData?.gameById.gameName;

    // Get all forum posts for the game
    const { loading, error, data } = useQuery(GET_FORUM_POSTS_BY_GAME, {
        variables: { game: gameId },
    });

    // Display the forum posts if they exist
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Forum: {name}</h2>
            {data &&
                data.forumPostsByGame.map((forumPosts: ForumPost) => (
                    <div key={forumPosts.id as string} className="post">
                        <div className="postProfile">
                            <p>author: {forumPosts.author}, </p>
                        </div>
                        <div className="postData">
                            <p>title: {forumPosts.title}, </p>
                            <p>text: {forumPosts.text}</p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
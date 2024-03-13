"use client";
import { GET_FORUM_POSTS_BY_GAME } from "@/app/api/graphql/queries/forumPostQueries";
import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { ForumPost } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

function GetGameById(game: string) {

    const { loading, error, data } = useQuery(GET_GAME_BY_ID, {
        variables: { gameById: game }
    });
    if (data) {
        return data;
    }
}



export default function GetForumPost() {
    const [gameId, setGame] = useState("Metal Gear Rising 2 - Revengeance");
    useEffect(() => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const game = pathParts[2];
        setGame(game);
    }, []);

    const gameData = GetGameById(gameId);
    const name = gameData?.gameById.gameName;

    const { loading, error, data } = useQuery(GET_FORUM_POSTS_BY_GAME, {
        variables: { game: gameId },
    });

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
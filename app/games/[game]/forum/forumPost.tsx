"use client";
import { GET_FORUM_POSTS_BY_GAME } from "@/app/api/graphql/queries/forumQueries";
import { GET_GAME_BY_ID } from "@/app/api/graphql/queries/gameQueries";
import { ForumComment, ForumPost } from "@/types/DBTypes";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ForumCommentForm from "./[forumPosts]/forumCommentForm";
import { useRouter } from "next/navigation";
import { DELETE_FORUM_POST_MUTATION, UPDATE_FORUM_POST_MUTATION } from "@/app/api/graphql/mutations/forumMutations";
import GetLoggedInUser from "@/components/getLoggedInUser";

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
    const [updateForumPostMutation, { loading: updateForumPostLoading, error: updateForumPostError }] = useMutation(UPDATE_FORUM_POST_MUTATION);
    const [deleteForumPostMutation, { loading: deleteForumPostLoading, error: deleteForumPostError }] = useMutation(DELETE_FORUM_POST_MUTATION);
    const [gameId, setGame] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {
        const currentPath = window.location.pathname;
        const pathParts = currentPath.split("/");
        const game = pathParts[2];
        setGame(game);
    }, []);
    let user = GetLoggedInUser();
    const router = useRouter();
    const gameData = GetGameById(gameId);
    const name = gameData?.gameById.gameName;

    const handleEdit = async (id: string) => {
        try {
            const data = await updateForumPostMutation({
                variables: { updateForumPostId: id, updateForumPostText: text }
            });
            if (data) {
                console.log("Forum post updated: ", data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
        router.refresh();
    }

    const handleDelete = async (id: string) => {
        try {
            const data = await deleteForumPostMutation({
                variables: { deleteForumPostId: id }
            });
            if (data) {
                console.log("Forum post deleted: ", data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
        router.refresh();
    }

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
                        <div>
                            {forumPosts.author === user?.user_name && (
                                <button onClick={() => handleDelete(forumPosts.id as string)}>Delete</button>  
                            )}
                            <button onClick={() => router.push(`/games/${gameId}/forum/${forumPosts.id}`)}>Comments</button>
                        </div>

                    </div>
                ))}
        </div>
    );
}
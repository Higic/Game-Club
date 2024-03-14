"use client";
import { DELETE_FORUM_COMMENT_MUTATION } from "@/app/api/graphql/mutations/forumMutations";
import { GET_FORUM_COMMENTS_BY_POST } from "@/app/api/graphql/queries/forumQueries";
import { ForumComment, ForumPost } from "@/types/DBTypes";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";



export default function GetForumComment(post: string) {
    const [deleteForumCommentMutation, {loading: deleteForumCommentLoading, error: deleteForumCommentError}] = useMutation(DELETE_FORUM_COMMENT_MUTATION);
    const router = useRouter();
    console.log("Post: ", post);
    const handleDelete = async (id: string) => {
        try {
            const data = await deleteForumCommentMutation({
                variables: {deleteForumCommentId: id}
            });
            if (data) {
                console.log("Forum comment deleted: ", data);
            }
        } catch (error) {
            console.log("Error: ", error);
        }
        router.refresh()
    }

    const { loading, error, data } = useQuery(GET_FORUM_COMMENTS_BY_POST, {
        variables: { forumPostId: post },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    console.log("Forum comments: ", data);

    return (
        <div>
            {data &&
                data.forumCommentsByPost.map((forumComment: ForumComment) => (
                    <div key={forumComment.id as string} className="post">
                        <div className="postProfile">
                            <p>Author: {forumComment.author}, </p>
                        </div>
                        <div className="postData">
                            <p>{forumComment.text}</p>
                        </div>
                        <button onClick={() => handleDelete(forumComment.id as string)}>Delete</button>
                    </div>
                ))}
        </div>
    );
}
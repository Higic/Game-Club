"use client";
import { GET_FORUM_COMMENTS_BY_POST } from "@/app/api/graphql/queries/forumQueries";
import { ForumComment, ForumPost } from "@/types/DBTypes";
import { useQuery } from "@apollo/client";



export default function GetForumComment(post: string) {

    console.log("Post: ", post);

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
                    </div>
                ))}
        </div>
    );
}
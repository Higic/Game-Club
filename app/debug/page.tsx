"use client";



export default function Login() {
 
  return (
    <div>
      <h1>Debug page</h1>
      <div>
        <h2>Queries</h2>
        <div>
          <button>users</button>
          <button>usersById</button>
          <button>reviewsByGame</button>
          <button>reviewById</button>
          <button>lfgByUser</button>
          <button>lfgByUserlfgById</button>
          <button>lfgByGame</button>
          <button>games</button>
          <button>gameByName</button>
          <button>gameById</button>
          <button>forumPostsBygame</button>
          <button>forumPostByAuthor</button>
          <button>forumPostById</button>
          <button>forumCommentsByPost</button>
          <button>forumCommentsByAuhtor</button>
          <button>forumCommentById</button>
          <button>checkToken</button>
        </div>
      </div>
      <div>
        <h2>Mutations</h2>
        <div>
          <button>updateUser</button>
          <button>updateReview</button>
          <button>updateGame</button>
          <button>updateForumPost</button>
          <button>updateForumComment</button>
          <button>register</button>
          <button>login</button>
          <button>deleteUser</button>
          <button>deleteReview</button>
          <button>deleteLfg</button>
          <button>deleteGame</button>
          <button>deleteForumPost</button>
          <button>deleteForumComment</button>
          <button>createReview</button>
          <button>createLfg</button>
          <button>createForumPost</button>
          <button>createForumComment</button>
          <button>adminUpdateUser</button>
          <button>adminDeleteUser</button>
        </div>
      </div>
    </div>
  );
}

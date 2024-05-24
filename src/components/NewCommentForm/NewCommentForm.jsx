import { useState } from "react";
import { createComment } from "../../utilities/experiences-api";

export default function NewCommentForm({ addComment, user, experience }) {
  const [newComment, setNewComment] = useState({
    content: "",
  });
  async function handleNewComment(evt) {
    evt.preventDefault();
    try {
      const commentData = {
        content: newComment.content,
        user: user,
      };
      const comment = await createComment(commentData, experience._id);
      addComment(comment);
      setNewComment({ content: "" });
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setNewComment({
      ...newComment,
      [name]: value,
    });
  }

  return (
    <form onSubmit={handleNewComment} className="comment-form">
      <input
        type="text"
        name="content"
        value={newComment.content}
        onChange={handleChange}
        className="comment-input"
        placeholder="Add a comment..."
      />
      <button className="comment-submit">Submit</button>
    </form>
  );
}

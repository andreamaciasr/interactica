import { Link } from "react-router-dom";
import { useState } from "react";
import { createComment } from "../../utilities/experiences-api";

export default function ExperienceItem({ experience, user }) {
  const [newComment, setNewComment] = useState({
    content: "",
  });
  const [comments, setComments] = useState(experience.comments);

  function addComment(comment) {
    setComments([...comments, comment]);
  }

  //fetch("/experience._id/create_comment")
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
    const { name, value } = evt.target; // evt.target.name
    setNewComment({
      ...newComment,
      [name]: value,
    });
  }

  return (
    <>
      {" "}
      <Link to={`/experiences/${experience._id}`}>
        <h3>{experience.title}</h3>
      </Link>
      <p>
        {experience.description} {experience.user.name}
      </p>
      {experience.comments.length > 0 ? (
        experience.comments.map((c) => (
          <p key={c._id}>
            {c.content} {c.user.name}
          </p>
        ))
      ) : (
        <div></div>
      )}
      <div>
        <form onSubmit={handleNewComment}>
          <title>Add Comment</title>
          <input
            type="text"
            name="content"
            value={newComment.content}
            onChange={handleChange}
          />
          <button>Submit</button>
        </form>
      </div>
    </>
  );
}

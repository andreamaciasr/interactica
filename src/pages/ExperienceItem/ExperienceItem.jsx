import { Link } from "react-router-dom";
import { useState } from "react";
import { createComment } from "../../utilities/experiences-api";
import "./ExperienceItem.css";

export default function ExperienceItem({ experience, user }) {
  const [newComment, setNewComment] = useState({
    content: "",
  });
  const [comments, setComments] = useState(experience.comments);
  const [showComments, setShowComments] = useState(true);

  function addComment(comment) {
    setComments([...comments, comment]);
  }

  async function handleNewComment(evt) {
    evt.preventDefault();
    try {
      const commentData = {
        content: newComment.content,
        user: user,
      };
      const comment = await createComment(commentData, experience._id);
      addComment(comment);
      console.log(comment);
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
    <div className="experience-item">
      <Link to={`/experiences/${experience._id}`} className="experience-link">
        <h1 className="experience-title">{experience.title}</h1>
        <p className="experience-description">
          {experience.description}
          {experience.user && experience.user.name}
        </p>
      </Link>

      <div className="comments-section">
        <button
          className="comment-show"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? "Hide" : "Show Comments"}
        </button>
        {experience.comments &&
        experience.comments.length > 0 &&
        showComments ? (
          <div>
            {experience.comments.map((c) => (
              <p key={c._id} className="comment">
                {c.content} - {c.user.name}
              </p>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>

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
    </div>
  );
}

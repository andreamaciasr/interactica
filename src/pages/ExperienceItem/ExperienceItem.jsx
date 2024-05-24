import { Link } from "react-router-dom";
import { useState } from "react";
import { createComment } from "../../utilities/experiences-api";
import "./ExperienceItem.css";

export default function ExperienceItem({ experience, user }) {
  const [newComment, setNewComment] = useState({
    content: "",
  });
  const [comments, setComments] = useState(experience.comments);
  const [showComments, setShowComments] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);

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
      <p className="experience-username">
        Created By: {experience.user && experience.user.name}
      </p>
      <Link to={`/experiences/${experience._id}`} className="experience-link">
        <h1 className="experience-title">{experience.title}</h1>
        <p className="experience-description">{experience.description}</p>
      </Link>

      <div className="comments-section">
        <button
          className="comment-show"
          onClick={() => setShowComments(!showComments)}
        >
          {showComments ? (
            <img
              src="./closed-eye.png"
              alt="Hide"
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: "transparent",
              }}
            />
          ) : (
            <img
              src="./eye.png"
              alt="Show Comments"
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: "transparent",
              }}
            />
          )}
        </button>
        {experience.comments &&
        experience.comments.length > 0 &&
        showComments ? (
          <div>
            {experience.comments.map((c) => (
              <>
                <p className="comment-username">{c.user.name} says:</p>
                <p key={c._id} className="comment">
                  {c.content}
                </p>
              </>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <button
        className="form-show"
        onClick={() => setShowCommentForm(!showCommentForm)}
      >
        {showCommentForm ? (
          <img
            src="./comment.png"
            style={{
              width: "28px", // Adjust the width as needed
              height: "28px", // Adjust the height as needed
              position: "relative", // Set position to relative
              left: "-20px", // Move the image to the left (adjust as needed)
              backgroundColor: "transparent",
            }}
          />
        ) : (
          <img
            src="./comment.png"
            style={{
              width: "28px", // Adjust the width as needed
              height: "28px", // Adjust the height as needed
              position: "relative", // Set position to relative
              left: "-20px", // Move the image to the left (adjust as needed)
              backgroundColor: "transparent",
            }}
          />
        )}
      </button>
      {showCommentForm ? (
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
      ) : (
        <div></div>
      )}
    </div>
  );
}

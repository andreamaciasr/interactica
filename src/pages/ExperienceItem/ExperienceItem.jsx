import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ExperienceItem.css";
import NewCommentForm from "../../components/NewCommentForm/NewCommentForm";
import { getComments } from "../../utilities/experiences-api";

export default function ExperienceItem({ experience, user }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);

  function addComment(comment) {
    setComments([...comments, comment]);
  }

  useEffect(() => {
    async function fetchComments() {
      const commentList = await getComments(experience._id);
      setComments(commentList);
    }

    fetchComments();
  }, []);

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
            {comments.map((c) => (
              <div key={c._id}>
                <p className="comment-username">
                  {c.user ? c.user.name : ""} says:
                </p>
                <p className="comment">{c.content}</p>
              </div>
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
              width: "28px",
              height: "28px",
              position: "relative",
              left: "-20px",
              backgroundColor: "transparent",
            }}
          />
        ) : (
          <img
            src="./comment.png"
            style={{
              width: "28px",
              height: "28px",
              position: "relative",
              left: "-20px",
              backgroundColor: "transparent",
            }}
          />
        )}
      </button>
      {showCommentForm ? (
        <NewCommentForm
          addComment={addComment}
          user={user}
          experience={experience}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}

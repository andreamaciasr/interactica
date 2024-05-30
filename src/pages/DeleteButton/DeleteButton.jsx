import { deleteComment } from "../../utilities/experiences-api";

export default function DeleteButton({ user, experience, comment }) {
  async function handleDelete(evt) {
    evt.preventDefault();

    try {
      console.log(experience._id, comment._id);
      await deleteComment(experience._id, comment._id);
    } catch (error) {
      console.log("fail server side ", error);
    }
  }

  return (
    <div>
      {user.name === comment.user.name ? (
        <button onClick={handleDelete}>X</button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";

export default function ExperienceItem({ experience }) {
  return (
    <Link to={`/experiences/${experience._id}`}>
      <h3>{experience.title}</h3>
      <p>{experience.description}</p>
    </Link>
  );
}

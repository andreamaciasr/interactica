import { Link } from "react-router-dom";

export default function ExperienceItem({ experience }) {
  console.log("ID: ", experience._id);
  return (
    <Link to={`/experiences/${experience._id}`}>
      <h3>{experience.title}</h3>
      <img src={experience.img} />
    </Link>
  );
}

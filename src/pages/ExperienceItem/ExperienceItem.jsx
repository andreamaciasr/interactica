import { Link } from "react-router-dom";

export default function ExperienceItem({ experience }) {
  return (
    <Link to={`/experiences/${experience.id}`}>
      <h3>{experience.title}</h3>
      <img src={experience.img} />
    </Link>
  );
}
